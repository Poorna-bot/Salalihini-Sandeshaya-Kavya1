"use client";

import React from "react";
import Link from "next/link";
import { SECTIONS, TOTAL_VERSES, VerseData } from "@/data";
import { THEMES } from "@/lib/themes";
import { BirdMark } from "./Icons";

export function JourneyRail({ verse }: { verse: VerseData }) {
  const progressPct = ((verse.n - 1) / (TOTAL_VERSES - 1)) * 100;

  return (
    <aside
      aria-label="Poem progress"
      className="fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-2 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto glass rounded-2xl px-4 py-2.5 pointer-events-auto">
        <div className="flex items-center justify-between text-xs mb-2 gap-2">
          <div className="flex items-center gap-2 truncate">
            <span lang="si" className="font-sinhala text-gold font-medium">
              {verse.section.si}
            </span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-soft truncate">{verse.section.en}</span>
          </div>
          <span className="font-mono text-xs text-gold shrink-0">
            {String(verse.n).padStart(2, "0")} / {TOTAL_VERSES}
          </span>
        </div>

        <div className="relative pt-2 pb-1">
          {/* Gliding Starling Indicator */}
          <div
            className="absolute -top-1.5 -translate-x-1/2 text-gold transition-all duration-500 pointer-events-none drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
            style={{ left: `${progressPct}%` }}
            aria-hidden="true"
          >
            <BirdMark className="w-4 h-4" />
          </div>

          <div className="grid grid-cols-20 gap-1 items-center">
            {SECTIONS.map((sec) => {
              const isCurrent = sec.id === verse.section.id;
              const isPast = verse.n > sec.to;
              const theme = THEMES[sec.theme];
              const href = sec.from === 1 ? "/" : `/verse/${sec.from}`;
              return (
                <Link
                  key={sec.id}
                  href={href}
                  title={`${sec.si} · ${sec.en} (Verse ${sec.from}${sec.to > sec.from ? `–${sec.to}` : ""})`}
                  aria-label={`Jump to ${sec.en}, verse ${sec.from}`}
                  className="group py-1.5 focus-visible:outline-2 focus-visible:outline-gold rounded"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isCurrent
                        ? "scale-y-125 shadow-[0_0_10px_rgba(0,229,255,0.75)]"
                        : isPast
                        ? "opacity-80"
                        : "opacity-30 group-hover:opacity-60"
                    }`}
                    style={{
                      backgroundColor: isCurrent || isPast ? theme.accent : "rgba(186, 230, 253, 0.35)",
                    }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
