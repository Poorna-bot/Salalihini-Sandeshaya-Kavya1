"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BirdMark,
  GlobeIcon,
  MapIcon,
  BookIcon,
  SmileIcon,
  PlayIcon,
  PauseIcon,
  WindIcon,
} from "./Icons";
import { useAppStore, setAutoFly, setCalmMode } from "@/lib/loading";
import { useJourney } from "@/lib/useJourney";

export function Header() {
  const pathname = usePathname() || "/";
  const { calmMode, autoFly } = useAppStore();
  const { isVersePage } = useJourney();

  const navItems = [
    { href: "/map", label: "3D Map", icon: GlobeIcon, hideLabelBelowLg: false },
    { href: "/journey", label: "Journey", icon: MapIcon, hideLabelBelowLg: false },
    { href: "/about", label: "About", icon: BookIcon, hideLabelBelowLg: false },
    { href: "/developer", label: "Developer", icon: SmileIcon, hideLabelBelowLg: true },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-40 px-4 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className="max-w-5xl mx-auto glass rounded-full px-3.5 py-2 flex items-center justify-between gap-2 pointer-events-auto"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
        >
          <span className="text-gold drop-shadow-[0_0_8px_rgba(0,229,255,0.65)]">
            <BirdMark className="w-6 h-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span lang="si" className="font-sinhala text-xs sm:text-sm font-medium text-ink">
              සැළලිහිණි සංදේශය
            </span>
            <span className="text-[10px] sm:text-xs text-ink-soft hidden sm:inline">
              The Starling&apos;s Message
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all ${
                  active
                    ? "bg-gold/20 text-gold border border-gold/40 shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                    : "text-ink-soft hover:text-ink hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className={item.hideLabelBelowLg ? "hidden lg:inline" : "hidden md:inline"}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {isVersePage && (
            <button
              type="button"
              onClick={() => setAutoFly(!autoFly)}
              aria-label={autoFly ? "Pause auto-advance" : "Fly with the starling (auto-advance)"}
              title={autoFly ? "Pause auto-advance" : "Fly with the starling (auto-advance every 14s)"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all ${
                autoFly
                  ? "bg-gold text-[#030816] font-medium shadow-[0_0_14px_rgba(0,229,255,0.5)]"
                  : "text-ink-soft hover:text-ink hover:bg-white/5"
              }`}
            >
              {autoFly ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
              <span className="hidden xl:inline">{autoFly ? "Flying" : "Fly"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setCalmMode(!calmMode)}
            aria-pressed={calmMode}
            aria-label="Toggle calm mode"
            title={calmMode ? "Calm mode is ON" : "Calm mode (reduce motion)"}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs transition-all ${
              calmMode
                ? "bg-gold/25 text-gold border border-gold/40"
                : "text-ink-soft hover:text-ink hover:bg-white/5"
            }`}
          >
            <WindIcon className="w-4 h-4" />
            <span className="hidden xl:inline">Calm</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
