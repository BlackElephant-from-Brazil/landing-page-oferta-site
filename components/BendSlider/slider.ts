import * as THREE from "three";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform sampler2D uTexture;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform float uVelocity;
varying vec2 vUv;

void main() {
  float pRatio = uPlaneSize.x / uPlaneSize.y;
  float iRatio = uImageSize.x / uImageSize.y;

  // object-fit: contain — imagem inteira visível, áreas vazias transparentes
  float wider = step(iRatio, pRatio);
  vec2 displayFrac = mix(
    vec2(1.0, pRatio / iRatio),
    vec2(iRatio / pRatio, 1.0),
    wider
  );

  vec2 uv = (vUv - 0.5) / displayFrac + 0.5;

  vec2 inB = step(vec2(0.0), uv) * step(uv, vec2(1.0));
  float mask = inB.x * inB.y;

  uv = clamp(uv, 0.0, 1.0);

  float shift = uVelocity * 0.00035;
  float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
  gl_FragColor = vec4(r * mask, g * mask, b * mask, mask);
}
`;

interface SliderSettings {
  wheelSensitivity: number;
  smoothing: number;
  slideLerp: number;
  distortionSmoothing: number;
  distortionDecay: number;
  maxCurvature: number;
  distortionRadius: number;
  autoScrollSpeed: number;
}

const DEFAULT_SETTINGS: SliderSettings = {
  wheelSensitivity: 0.9,
  smoothing: 0.07,
  slideLerp: 0.1,
  distortionSmoothing: 0.09,
  distortionDecay: 0.94,
  maxCurvature: 120,
  distortionRadius: 700,
  autoScrollSpeed: 0,
};

export class BendSlider {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private slides: THREE.Mesh[] = [];
  private loader: THREE.TextureLoader;

  private planeW = 0;
  private planeH = 0;
  private gap = 0;
  private slideUnit = 0;
  private totalWidth = 0;

  private currentPosition = 0;
  private targetPosition = 0;
  private autoScrollSpeed = 0;
  private isScrolling = false;
  private isDecelerating = false;
  private currentDistortionFactor = 0;
  private targetDistortionFactor = 0;
  private velocityHistory: number[] = [0, 0, 0, 0, 0];

  private rafId = 0;
  private lastTime = 0;
  private settings: SliderSettings;

  private boundWheel: (e: WheelEvent) => void;
  private boundPointerDown: (e: PointerEvent) => void;
  private boundPointerMove: (e: PointerEvent) => void;
  private boundPointerUp: (e: PointerEvent) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundResize: () => void;
  private boundMouseEnter: () => void;
  private boundMouseLeave: () => void;

  private isDragging = false;
  private dragStartX = 0;
  private dragLastX = 0;
  private scrollTimeout = 0;
  private imageUrls: string[] = [];
  private isUserInteracting = false;
  private interactionTimeout = 0;
  private isMouseOver = false;

  constructor(container: HTMLElement, settings?: Partial<SliderSettings>) {
    this.container = container;
    this.settings = { ...DEFAULT_SETTINGS, ...settings };

    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(this.canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.loader = new THREE.TextureLoader();

    const { w, h } = this.size();
    this.camera = this.makeCamera(w, h);
    this.renderer.setSize(w, h);

    this.boundWheel = this.onWheel.bind(this);
    this.boundPointerDown = this.onPointerDown.bind(this);
    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundPointerUp = this.onPointerUp.bind(this);
    this.boundKeyDown = this.onKeyDown.bind(this);
    this.boundResize = this.onResize.bind(this);
    this.boundMouseEnter = () => { this.isMouseOver = true; };
    this.boundMouseLeave = () => { this.isMouseOver = false; };

    container.addEventListener("wheel", this.boundWheel, { passive: false });
    container.addEventListener("mouseenter", this.boundMouseEnter);
    container.addEventListener("mouseleave", this.boundMouseLeave);
    container.addEventListener("pointerdown", this.boundPointerDown);
    window.addEventListener("pointermove", this.boundPointerMove);
    window.addEventListener("pointerup", this.boundPointerUp);
    window.addEventListener("keydown", this.boundKeyDown);
    window.addEventListener("resize", this.boundResize);

    this.tick = this.tick.bind(this);
  }

  private size() {
    return { w: this.container.clientWidth, h: this.container.clientHeight };
  }

  private makeCamera(w: number, h: number) {
    const distance = h;
    const fov = 2 * Math.atan(h / 2 / distance) * (180 / Math.PI);
    const cam = new THREE.PerspectiveCamera(fov, w / h, 0.1, distance * 4);
    cam.position.z = distance;
    return cam;
  }

  loadImages(urls: string[]) {
    this.imageUrls = urls;
    this.slides.forEach((m) => {
      const mat = m.material as THREE.ShaderMaterial;
      mat.uniforms.uTexture.value?.dispose();
      mat.dispose();
      m.geometry.dispose();
      this.scene.remove(m);
    });
    this.slides = [];
    this.currentPosition = 0;
    this.targetPosition = 0;
    this.autoScrollSpeed = 0;
    this.currentDistortionFactor = 0;
    this.targetDistortionFactor = 0;

    if (!urls.length) return;
    this.computeLayout(urls.length);
    this.buildSlides(urls);
    if (!this.rafId) this.rafId = requestAnimationFrame(this.tick);
  }

  private computeLayout(count: number) {
    const { w, h } = this.size();
    this.planeH = h * 0.88;
    this.planeW = this.planeH * 1.42;
    this.gap = 24;
    this.slideUnit = this.planeW + this.gap;
    this.totalWidth = this.slideUnit * count;
  }

  private buildSlides(urls: string[]) {
    urls.forEach((url, i) => {
      const geo = new THREE.PlaneGeometry(this.planeW, this.planeH, 40, 40);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: {
          uTexture: { value: null },
          uImageSize: { value: new THREE.Vector2(1, 1) },
          uPlaneSize: { value: new THREE.Vector2(this.planeW, this.planeH) },
          uVelocity: { value: 0 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { targetX: i * this.slideUnit, currentX: i * this.slideUnit };
      mesh.position.x = i * this.slideUnit - this.totalWidth / 2;
      this.scene.add(mesh);
      this.slides.push(mesh);

      this.loader.load(url, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        mat.uniforms.uTexture.value = tex;
        mat.uniforms.uImageSize.value.set(tex.image.width, tex.image.height);
      });
    });
  }

  private updateCurve(mesh: THREE.Mesh, worldX: number, distortionFactor: number) {
    const geo = mesh.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const { maxCurvature, distortionRadius } = this.settings;

    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i);
      const ly = pos.getY(i);
      const vwx = worldX + lx;
      const dist = Math.sqrt(vwx * vwx + ly * ly);
      const strength = Math.max(0, 1 - dist / distortionRadius);
      const curveZ = Math.pow(Math.sin((strength * Math.PI) / 2), 1.5) * maxCurvature * distortionFactor;
      pos.setZ(i, curveZ);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }

  private tick(time: number) {
    this.rafId = requestAnimationFrame(this.tick);

    const deltaTime = this.lastTime ? (time - this.lastTime) / 1000 : 0.016;
    this.lastTime = time;

    const prevPos = this.currentPosition;

    if (this.isScrolling) {
      this.targetPosition += this.autoScrollSpeed;
      const speedBasedDecay = 0.97 - Math.abs(this.autoScrollSpeed) * 0.5;
      this.autoScrollSpeed *= Math.max(0.92, speedBasedDecay);
      if (Math.abs(this.autoScrollSpeed) < 0.001) {
        this.autoScrollSpeed = 0;
      }
    }

    this.currentPosition +=
      (this.targetPosition - this.currentPosition) * this.settings.smoothing;

    const currentVelocity = Math.abs(this.currentPosition - prevPos) / Math.max(deltaTime, 0.001);
    this.velocityHistory.push(currentVelocity);
    this.velocityHistory.shift();
    const avgVelocity =
      this.velocityHistory.reduce((s, v) => s + v, 0) / this.velocityHistory.length;

    const movementDistortion = Math.min(1.0, currentVelocity * 0.1);
    if (currentVelocity > 0.05) {
      this.targetDistortionFactor = Math.max(
        this.targetDistortionFactor,
        movementDistortion
      );
    }

    if (this.isDecelerating || avgVelocity < 0.2) {
      const decayRate = this.isDecelerating
        ? this.settings.distortionDecay
        : this.settings.distortionDecay * 0.9;
      this.targetDistortionFactor *= decayRate;
    }

    this.currentDistortionFactor +=
      (this.targetDistortionFactor - this.currentDistortionFactor) *
      this.settings.distortionSmoothing;

    if (this.slides.length === 0) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    this.slides.forEach((slide, i) => {
      let baseX = i * this.slideUnit - this.currentPosition;
      baseX = ((baseX % this.totalWidth) + this.totalWidth) % this.totalWidth;
      if (baseX > this.totalWidth / 2) baseX -= this.totalWidth;

      const isWrapping = Math.abs(baseX - slide.userData.targetX) > this.slideUnit * 2;
      if (isWrapping) {
        slide.userData.currentX = baseX;
      }

      slide.userData.targetX = baseX;
      slide.userData.currentX +=
        (slide.userData.targetX - slide.userData.currentX) * this.settings.slideLerp;

      const wrapThreshold = this.totalWidth / 2 + this.planeW;
      if (Math.abs(slide.userData.currentX) < wrapThreshold * 1.5) {
        slide.position.x = slide.userData.currentX;
        this.updateCurve(slide, slide.position.x, this.currentDistortionFactor);
        const mat = slide.material as THREE.ShaderMaterial;
        mat.uniforms.uVelocity.value = this.currentPosition - prevPos;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  private markInteracting() {
    this.isUserInteracting = true;
    clearTimeout(this.interactionTimeout);
    this.interactionTimeout = window.setTimeout(() => {
      this.isUserInteracting = false;
    }, 2400);
  }

  private onWheel(e: WheelEvent) {
    if (this.isMouseOver) e.preventDefault();
    const wheelStrength = Math.abs(e.deltaY) * 0.001;
    this.targetDistortionFactor = Math.min(1.0, this.targetDistortionFactor + wheelStrength);
    this.targetPosition += e.deltaY * this.settings.wheelSensitivity;
    this.isScrolling = true;
    this.isDecelerating = false;
    this.autoScrollSpeed =
      Math.min(Math.abs(e.deltaY) * 0.0005, 0.05) * Math.sign(e.deltaY);
    this.markInteracting();

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(() => {
      this.isScrolling = false;
      this.isDecelerating = true;
      window.setTimeout(() => { this.isDecelerating = false; }, 400);
    }, 800);
  }

  private onPointerDown(e: PointerEvent) {
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragLastX = e.clientX;
    this.markInteracting();
    this.container.setPointerCapture(e.pointerId);
  }

  private onPointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    const delta = this.dragLastX - e.clientX;
    this.targetPosition += delta * 1.5;
    const dragStrength = Math.abs(delta) * 0.01;
    this.targetDistortionFactor = Math.min(1.0, this.targetDistortionFactor + dragStrength);
    this.dragLastX = e.clientX;
    this.markInteracting();
  }

  private onPointerUp(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const totalDrag = this.dragStartX - e.clientX;
    this.autoScrollSpeed = totalDrag * 0.003;
    this.isScrolling = true;
    this.markInteracting();
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = window.setTimeout(() => {
      this.isScrolling = false;
      this.isDecelerating = true;
      window.setTimeout(() => { this.isDecelerating = false; }, 400);
    }, 600);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      this.targetPosition += this.slideUnit;
      this.targetDistortionFactor = Math.min(1.0, this.targetDistortionFactor + 0.3);
      this.markInteracting();
    } else if (e.key === "ArrowRight") {
      this.targetPosition -= this.slideUnit;
      this.targetDistortionFactor = Math.min(1.0, this.targetDistortionFactor + 0.3);
      this.markInteracting();
    }
  }

  private onResize() {
    const { w, h } = this.size();
    this.camera.aspect = w / h;
    this.camera.position.z = h;
    const fov = 2 * Math.atan(h / 2 / h) * (180 / Math.PI);
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.computeLayout(this.slides.length);
    this.slides.forEach((slide, i) => {
      slide.geometry.dispose();
      slide.geometry = new THREE.PlaneGeometry(this.planeW, this.planeH, 40, 40);
      const mat = slide.material as THREE.ShaderMaterial;
      mat.uniforms.uPlaneSize.value.set(this.planeW, this.planeH);
    });
  }

  start() {
    if (!this.rafId && this.slides.length > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    this.lastTime = 0;
  }

  dispose() {
    this.stop();
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.interactionTimeout);
    this.container.removeEventListener("wheel", this.boundWheel);
    this.container.removeEventListener("mouseenter", this.boundMouseEnter);
    this.container.removeEventListener("mouseleave", this.boundMouseLeave);
    this.container.removeEventListener("pointerdown", this.boundPointerDown);
    window.removeEventListener("pointermove", this.boundPointerMove);
    window.removeEventListener("pointerup", this.boundPointerUp);
    window.removeEventListener("keydown", this.boundKeyDown);
    window.removeEventListener("resize", this.boundResize);
    this.slides.forEach((m) => {
      const mat = m.material as THREE.ShaderMaterial;
      mat.uniforms.uTexture.value?.dispose();
      mat.dispose();
      m.geometry.dispose();
    });
    this.renderer.dispose();
    this.canvas.remove();
  }
}
