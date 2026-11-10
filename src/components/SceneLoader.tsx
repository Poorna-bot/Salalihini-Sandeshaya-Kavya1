"use client";

import React, { Component, ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { markReady } from "@/lib/loading";

const SceneRoot = dynamic(() => import("./SceneRoot"), { ssr: false });
const BirdOverlay = dynamic(() => import("./BirdOverlay"), { ssr: false });

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    markReady("scene");
    markReady("bird");
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function SceneLoader() {
  const pathname = usePathname() || "/";
  // Render nothing on /map so two WebGL contexts never run at once
  if (pathname.startsWith("/map")) return null;

  return (
    <WebGLErrorBoundary>
      <SceneRoot />
      <BirdOverlay />
    </WebGLErrorBoundary>
  );
}
