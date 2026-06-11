"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

export const useScrollTo = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToSection = useCallback((e: React.MouseEvent, id: string) => {
    if (!isHome) return;

    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [isHome]);

  return { scrollToSection, pathname, isHome };
};
