"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "@/lib/loading";

export function Engineer() {
  const { calmMode } = useAppStore();
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (calmMode) {
      setLook({ x: 0, y: 0 });
      return;
    }

    let lastMouseMove = 0;
    const onMove = (e: MouseEvent) => {
      lastMouseMove = Date.now();
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setLook({
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const idleInterval = setInterval(() => {
      if (Date.now() - lastMouseMove > 2500) {
        const t = Date.now() * 0.0012;
        setLook({
          x: Math.sin(t) * 0.55,
          y: Math.cos(t * 0.7) * 0.3,
        });
      }
    }, 60);

    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3800);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(idleInterval);
      clearInterval(blinkInterval);
    };
  }, [calmMode]);

  const pupilX = look.x * 4.5;
  const pupilY = look.y * 3.5;
  const headTilt = look.x * 4;
  const headShiftX = look.x * 3;
  const headShiftY = look.y * 2;

  return (
    <div className="relative w-full max-w-[260px] mx-auto select-none">
      <svg
        viewBox="0 0 220 240"
        className="w-full h-auto drop-shadow-[0_0_24px_rgba(0,229,255,0.2)]"
        role="img"
        aria-label="Illustrated student developer wearing round glasses"
      >
        <defs>
          <radialGradient id="neonHalo" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#030816" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Neon Halo */}
        <circle cx="110" cy="110" r="88" fill="url(#neonHalo)" />

        {/* Shoulders / Upper-body hoodie (laptop-less pose) */}
        <path
          d="M42 225 C46 172, 174 172, 178 225 Z"
          fill="#0a1f44"
          stroke="#00e5ff"
          strokeWidth="1.6"
          strokeOpacity="0.5"
        />
        <path
          d="M86 176 L110 202 L134 176"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Neck */}
        <rect x="97" y="146" width="26" height="32" rx="10" fill="#d9a17c" />

        {/* Tilting Head Group */}
        <g
          transform={`translate(${headShiftX}, ${headShiftY}) rotate(${headTilt}, 110, 115)`}
          style={{ transition: "transform 90ms ease-out" }}
        >
          {/* Ears */}
          <circle cx="64" cy="116" r="10" fill="#d9a17c" />
          <circle cx="156" cy="116" r="10" fill="#d9a17c" />

          {/* Face */}
          <rect x="68" y="64" width="84" height="92" rx="40" fill="#e6b28e" />

          {/* Wavy Dark Hair */}
          <path
            d="M64 98 C60 60, 92 44, 114 46 C140 46, 162 64, 156 98 C146 78, 128 72, 108 74 C88 74, 74 82, 64 98 Z"
            fill="#091326"
          />

          {/* Eyebrows */}
          <path
            d="M80 94 Q91 89 101 93"
            fill="none"
            stroke="#091326"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M119 93 Q129 89 140 94"
            fill="none"
            stroke="#091326"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Round Neon-Blue Glasses & Eyes */}
          <g>
            <circle
              cx="91"
              cy="110"
              r="15"
              fill="#041028"
              fillOpacity="0.22"
              stroke="#00e5ff"
              strokeWidth="2.6"
            />
            <circle
              cx="129"
              cy="110"
              r="15"
              fill="#041028"
              fillOpacity="0.22"
              stroke="#00e5ff"
              strokeWidth="2.6"
            />
            <line x1="106" y1="110" x2="114" y2="110" stroke="#00e5ff" strokeWidth="2.4" />

            {blink ? (
              <>
                <line x1="83" y1="110" x2="99" y2="110" stroke="#091326" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="121" y1="110" x2="137" y2="110" stroke="#091326" strokeWidth="2.4" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx={91 + pupilX} cy={110 + pupilY} r="4.5" fill="#091326" />
                <circle cx={92.5 + pupilX} cy={108.5 + pupilY} r="1.5" fill="#00e5ff" />
                <circle cx={129 + pupilX} cy={110 + pupilY} r="4.5" fill="#091326" />
                <circle cx={130.5 + pupilX} cy={108.5 + pupilY} r="1.5" fill="#00e5ff" />
              </>
            )}
          </g>

          {/* Nose & Warm Smile */}
          <path d="M110 114 L108 124 L113 125" fill="none" stroke="#b57c56" strokeWidth="2" strokeLinecap="round" />
          <path d="M98 136 Q110 144 122 136" fill="none" stroke="#6e3b26" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
