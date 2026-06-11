"use client";

import { useState, useEffect, useCallback } from "react";
import type { UIEvent } from "react";

export const useCarousel = () => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback((target: HTMLDivElement | null = element) => {
    if (!target) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = target;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, [element]);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setElement(node);
    checkScroll(node);
  }, [checkScroll]);

  useEffect(() => {
    const handleResize = () => checkScroll();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkScroll]);

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    checkScroll(event.currentTarget);
  }, [checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    if (element) {
      const { clientWidth } = element;
      const amount = direction === "left" ? -clientWidth : clientWidth;
      element.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, [element]);

  return {
    canScrollLeft,
    canScrollRight,
    handleScroll,
    scroll,
    setContainerRef,
  };
};
