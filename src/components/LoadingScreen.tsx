"use client";

import React, { useEffect } from "react";
import { markReady, setLoaded, useAppStore } from "@/lib/loading";
import { BirdMark } from "./Icons";

export function LoadingScreen() {
  const { readyKeys, loaded } = useAppStore();

  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => markReady("fonts")).catch(() => markReady("fonts"));
    } else {
      markReady("fonts");
    }

    // Fallback timeout so the loader can never block forever
    const timer = setTimeout(() => {
      markReady("fonts");
      markReady("scene");
      markReady("bird");
      markReady("map");
      setLoaded();
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (readyKeys.has("fonts") && (readyKeys.has("scene") || readyKeys.has("map"))) {
      const t = setTimeout(() => setLoaded(), 280);
      return () => clearTimeout(t);
    }
  }, [readyKeys]);

  if (loaded) return null;

  const progress = Math.min(100, Math.round((readyKeys.size / 3) * 100));

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 bg-[#030816] flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500"
    >
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(0,229,255,0.35)] animate-pulse">
          <BirdMark className="w-9 h-9" />
        </div>
      </div>
      <h1 lang="si" className="font-elu text-2xl sm:text-3xl text-ink mb-1">
        සැළලිහිණි සංදේශය
      </h1>
      <p className="font-display italic text-lg text-ink-soft mb-6">
        The Starling&apos;s Message
      </p>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold shadow-[0_0_12px_#00e5ff] transition-all duration-300"
          style={{ width: `${Math.max(25, progress)}%` }}
        />
      </div>
    </div>
  );
}
