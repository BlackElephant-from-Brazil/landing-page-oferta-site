"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// SVG Filter component for the glass distortion effect
export function GlassDistortionFilter() {
  return (
    <svg style={{ display: "none", position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface LiquidGlassV2Props {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  enableHover?: boolean;
  enableTilt?: boolean;
  blur?: number;
  variant?: "default" | "sidebar" | "menu" | "button" | "dock";
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function LiquidGlassV2({
  children,
  className = "",
  borderRadius = "1.8rem",
  enableHover = true,
  enableTilt = false,
  blur = 20,
  variant = "default",
  onDragOver,
  onDrop,
  onClick,
  style,
}: LiquidGlassV2Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !enableTilt) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Variant-specific padding
  const variantStyles = {
    default: { padding: "0.4rem" },
    sidebar: { padding: "0" },
    menu: { padding: "0.4rem" },
    button: { padding: "1.5rem 2.5rem" },
    dock: { padding: "0.6rem" },
  };

  const paddingStyle = variantStyles[variant];

  return (
    <motion.div
      ref={containerRef}
      className={`liquidGlass-wrapper relative flex w-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      style={{
        borderRadius,
        fontWeight: 600,
        color: "white",
        boxShadow:
          "0 16px 48px rgba(0, 0, 0, 0.14), 0 0 1px rgba(255, 255, 255, 0.14)",
        transition: enableHover ? "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)" : undefined,
        transformStyle: enableTilt ? "preserve-3d" : undefined,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        ...paddingStyle,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      whileHover={enableHover ? { 
        scale: 1.01,
        transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 2.2] }
      } : {}}
    >
      {/* Glass effect layer with SVG filter */}
      <div
        className="liquidGlass-effect absolute z-0 inset-0 overflow-hidden"
        style={{
          backdropFilter: `blur(${blur}px) saturate(155%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(155%)`,
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />

      {/* Tint layer */}
      <div
        className="liquidGlass-tint absolute z-[1] inset-0"
        style={{
          background:
            "linear-gradient(145deg, rgba(18, 18, 18, 0.14), rgba(18, 18, 18, 0.075) 48%, rgba(57, 254, 21, 0.028))",
        }}
      />

      {/* Shine layer - subtle glass edge highlights */}
      <div
        className="liquidGlass-shine absolute inset-0 z-[2] overflow-hidden"
        style={{
          boxShadow:
            "inset 1px 1px 0 0 rgba(255, 255, 255, 0.16), inset -1px -1px 0 0 rgba(255, 255, 255, 0.055)",
          borderRadius,
        }}
      />

      {/* Glass border */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius,
        }}
      />

      {/* Content */}
      <div className="liquidGlass-text relative z-[3] w-full">
        {children}
      </div>
    </motion.div>
  );
}

// Glass Button updated with V2 style
export function GlassButtonV2({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  title,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
  title?: string;
}) {
  const variants = {
    primary: {
      bg: "linear-gradient(135deg, #8cc04e 0%, #7ab043 100%)",
      text: "#0A0A0A",
      border: "none",
      shadow: "0 2px 8px rgba(140, 192, 78, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
      blur: false,
    },
    secondary: {
      bg: "rgba(255, 255, 255, 0.02)",
      text: "#F8F8F8",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      shadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
      blur: true,
    },
    ghost: {
      bg: "rgba(255, 255, 255, 0.01)",
      text: "#C2C2C2",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      shadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      blur: true,
    },
  };

  const style = variants[variant];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        relative overflow-hidden
        transition-all duration-200
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        background: style.bg,
        color: style.text,
        border: style.border,
        boxShadow: style.shadow,
        backdropFilter: style.blur ? "blur(20px) saturate(120%)" : undefined,
        WebkitBackdropFilter: style.blur ? "blur(20px) saturate(120%)" : undefined,
      }}
      whileHover={!disabled ? {
        scale: 1.02,
        filter: variant === "primary" ? "brightness(1.1)" : undefined,
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

// Sidebar specific glass component - no left border, tag-like appearance
export const SidebarGlass = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  }
>(function SidebarGlass({ children, className = "", isOpen = true, onScroll }, ref) {
  return (
    <div
      ref={ref}
      className={`relative flex flex-col overflow-hidden ${className}`}
      style={{
        borderRadius: isOpen ? "0 1.8rem 1.8rem 0" : "0 1rem 1rem 0",
        background: "rgba(18, 18, 18, 0.08)",
        backdropFilter: "blur(6px) saturate(120%)",
        WebkitBackdropFilter: "blur(6px) saturate(120%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        borderLeft: "none",
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.3), inset 1px 1px 0 rgba(255,255,255,0.08), inset -1px -1px 0 rgba(255,255,255,0.04)",
        transition: "border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        width: isOpen ? 288 : 56,
      }}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
});

// Provider component to include the SVG filter once in the app
export function LiquidGlassProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlassDistortionFilter />
      {children}
    </>
  );
}
