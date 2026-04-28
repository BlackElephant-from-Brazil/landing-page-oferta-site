"use client";

import { useEffect, useRef } from "react";
import { BendSlider } from "./slider";

interface Props {
  images: string[];
  className?: string;
}

export default function BendSliderComponent({ images, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<BendSlider | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const slider = new BendSlider(el);
    sliderRef.current = slider;
    slider.loadImages(images);

    return () => {
      slider.dispose();
      sliderRef.current = null;
    };
  }, []);

  useEffect(() => {
    sliderRef.current?.loadImages(images);
  }, [images]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", cursor: "grab" }}
    />
  );
}
