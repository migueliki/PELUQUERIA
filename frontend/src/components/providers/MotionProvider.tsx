"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

export default function MotionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
