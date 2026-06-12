"use client";

import React, { useEffect, useState, useCallback } from "react";
import { m, useReducedMotion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useSpring(0, { stiffness: 12000, damping: 240, mass: 0.001 });
  const mouseY = useSpring(0, { stiffness: 12000, damping: 240, mass: 0.001 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsVisible(true);
  }, [mouseX, mouseY]);

  const handleMouseDown = useCallback(() => setIsClicked(true), []);
  const handleMouseUp = useCallback(() => setIsClicked(false), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");

    const syncState = () => {
      setIsEnabled(mediaQuery.matches && !prefersReducedMotion);
    };

    syncState();
    mediaQuery.addEventListener("change", syncState);

    return () => mediaQuery.removeEventListener("change", syncState);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, isEnabled]);

  if (!isEnabled || !isVisible) return null;

  return (
    <m.div
      animate={{ scale: isClicked ? 0.85 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        position: "fixed",
        top: -10,
        left: -10,
        width: 20,
        height: 20,
        backgroundColor: "white",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        willChange: "transform",
        x: mouseX,
        y: mouseY,
      }}
    />
  );
};

export default CustomCursor;
