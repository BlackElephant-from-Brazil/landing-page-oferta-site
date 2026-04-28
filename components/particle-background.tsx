"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
  onReady?: () => void;
  reducedMotion?: boolean;
}

export default function ParticleBackground({
  onReady,
  reducedMotion = false,
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readySentRef = useRef(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let particles: THREE.Points | null = null;
    let beamsGroup: THREE.Group | null = null;
    let fallbackGradient: HTMLDivElement | null = null;

    const announceReady = () => {
      if (!readySentRef.current) {
        readySentRef.current = true;
        onReadyRef.current?.();
      }
    };

    const buildFallback = () => {
      fallbackGradient = document.createElement("div");
      fallbackGradient.className = "absolute inset-0";
      fallbackGradient.style.background = `
        radial-gradient(circle at 20% 20%, rgba(57,254,21,0.12), transparent 24%),
        radial-gradient(circle at 80% 10%, rgba(255,255,255,0.08), transparent 20%),
        radial-gradient(circle at 50% 60%, rgba(57,254,21,0.08), transparent 30%)
      `;
      container.appendChild(fallbackGradient);
      announceReady();
    };

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        62,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 52;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.opacity = "0.92";
      container.appendChild(renderer.domElement);

      const particleCount = reducedMotion
        ? 70
        : window.innerWidth < 768
          ? 120
          : 190;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);
      const geometry = new THREE.BufferGeometry();
      const primary = new THREE.Color("#39fe15");
      const secondary = new THREE.Color("#f5f6f1");

      for (let index = 0; index < particleCount; index += 1) {
        const i3 = index * 3;
        const radius = 36 + Math.random() * 48;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi) - 36;
        velocities[i3] = (Math.random() - 0.5) * 0.012;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.012;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;
        const mixed = primary.clone().lerp(secondary, Math.random() * 0.45);
        colors[i3] = mixed.r;
        colors[i3 + 1] = mixed.g;
        colors[i3 + 2] = mixed.b;
        sizes[index] = Math.random() * 1.4 + 0.4;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: renderer.getPixelRatio() },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float uPixelRatio;

          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * uPixelRatio * (190.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;

          void main() {
            float distanceToCenter = length(gl_PointCoord - vec2(0.5));
            if (distanceToCenter > 0.5) discard;

            float alpha = smoothstep(0.5, 0.0, distanceToCenter) * 0.32;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      beamsGroup = new THREE.Group();
      const beamCount = reducedMotion ? 3 : 5;

      for (let index = 0; index < beamCount; index += 1) {
        const beamMaterial = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#39fe15") },
            uOffset: { value: index * 1.25 },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uOffset;
            varying vec2 vUv;

            void main() {
              float band = smoothstep(0.95, 0.0, abs(vUv.y - 0.5) * 2.0);
              float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
              float pulse = 0.55 + sin(uTime * 0.5 + uOffset) * 0.15;
              gl_FragColor = vec4(uColor, band * edge * pulse * 0.075);
            }
          `,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        });

        const beam = new THREE.Mesh(new THREE.PlaneGeometry(180, 2.6), beamMaterial);
        beam.position.x = -110 + index * 12;
        beam.position.y = (Math.random() - 0.5) * 44;
        beam.position.z = -52 - index * 8;
        beam.rotation.z = 0.16 + Math.random() * 0.2;
        beam.userData = {
          speed: 0.12 + Math.random() * 0.06,
          phase: Math.random() * Math.PI * 2,
        };
        beamsGroup.add(beam);
      }

      scene.add(beamsGroup);

      let scrollVelocity = 0;
      let lastScrollY = window.scrollY;
      const onScroll = () => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        const inTimeline = document.body.hasAttribute("data-timeline-scrolling");
        const mult = inTimeline ? 0.006 : 0.0025;
        scrollVelocity += delta * mult;
        scrollVelocity = Math.max(-0.24, Math.min(0.24, scrollVelocity));
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let time = 0;
      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate);
        time += reducedMotion ? 0.001 : 0.004;

        if (particles) {
          const attribute = particles.geometry.attributes.position
            .array as Float32Array;
          for (let index = 0; index < particleCount; index += 1) {
            const i3 = index * 3;
            attribute[i3] += velocities[i3] + 0.01 + scrollVelocity * 0.85;
            attribute[i3 + 1] += Math.sin(time + index * 0.18) * 0.01;
            attribute[i3 + 2] += velocities[i3 + 2];

            if (attribute[i3] > 96) {
              attribute[i3] = -96 + Math.random() * 16;
              attribute[i3 + 1] = (Math.random() - 0.5) * 90;
              attribute[i3 + 2] = (Math.random() - 0.5) * 42 - 32;
            } else if (attribute[i3] < -96) {
              attribute[i3] = 96 - Math.random() * 16;
              attribute[i3 + 1] = (Math.random() - 0.5) * 90;
              attribute[i3 + 2] = (Math.random() - 0.5) * 42 - 32;
            }
          }
          particles.geometry.attributes.position.needsUpdate = true;
          particles.rotation.y = Math.sin(time * 0.65) * 0.08;
        }

        beamsGroup?.children.forEach((beam, index) => {
          const mesh = beam as THREE.Mesh;
          mesh.position.x += mesh.userData.speed + scrollVelocity * 2.8;
          mesh.position.y += Math.sin(time * 0.5 + mesh.userData.phase + index) * 0.018;
          if (mesh.position.x > 120) {
            mesh.position.x = -128;
          } else if (mesh.position.x < -160) {
            mesh.position.x = 128;
          }
          const shader = mesh.material as THREE.ShaderMaterial;
          shader.uniforms.uTime.value = time;
        });

        scrollVelocity *= 0.93;

        renderer?.render(scene!, camera!);
        announceReady();
      };

      animate();

      const resize = () => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", resize);

      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        beamsGroup?.children.forEach((beam) => {
          const mesh = beam as THREE.Mesh;
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
        geometry.dispose();
        material.dispose();
        renderer?.dispose();
        if (renderer?.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      buildFallback();
      return () => {
        if (fallbackGradient && container.contains(fallbackGradient)) {
          container.removeChild(fallbackGradient);
        }
      };
    }
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
