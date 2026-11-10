"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, MotionConfig } from "motion/react";
import { TOTAL_VERSES, VerseData } from "@/data";
import { useAppStore } from "@/lib/loading";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { JourneyRail } from "./JourneyRail";

type LangMode = "both" | "si" | "en";

export function VerseReader({ verse }: { verse: VerseData }) {
  const router = useRouter();
  const { loaded, calmMode, autoFly } = useAppStore();
  const [lang, setLang] = useState<LangMode>("both");
  const touchStartX = useRef<number | null>(null);

  const prevHref =
    verse.n > 1 ? (verse.n - 1 === 1 ? "/" : `/verse/${verse.n - 1}`) : null;
  const nextHref = verse.n < TOTAL_VERSES ? `/verse/${verse.n + 1}` : null;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("salalihini-lang") as LangMode | null;
      if (saved === "both" || saved === "si" || saved === "en") {
        setLang(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const changeLang = (next: LangMode) => {
    setLang(next);
    try {
      localStorage.setItem("salalihini-lang", next);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevHref) {
        router.push(prevHref);
      } else if (e.key === "ArrowRight" && nextHref) {
        router.push(nextHref);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prevHref, nextHref, router]);

  useEffect(() => {
    if (!autoFly || !nextHref) return;
    const timer = setTimeout(() => {
      router.push(nextHref);
    }, 14000);
    return () => clearTimeout(timer);
  }, [autoFly, nextHref, router, verse.n]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    if (Math.abs(dx) > 60) {
      if (dx > 0 && prevHref) router.push(prevHref);
      if (dx < 0 && nextHref) router.push(nextHref);
    }
    touchStartX.current = null;
  };

  return (
    <MotionConfig reducedMotion={calmMode ? "always" : "never"}>
      <div
        key={`${verse.n}-${loaded ? "ready" : "init"}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="min-h-screen pt-24 pb-32 px-4 sm:px-6 flex flex-col justify-center max-w-4xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs text-gold mb-2">
            <span lang="si" className="font-sinhala">
              {verse.section.si}
            </span>
            <span className="text-ink-faint">·</span>
            <span>{verse.section.en}</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xl mx-auto">
            {verse.section.descEn}
          </p>
        </div>

        {/* Main Elu Verse Card */}
        <div className="glass rounded-3xl p-6 sm:p-10 mb-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <span className="font-display italic text-gold text-lg sm:text-xl">
              Verse {verse.n} of {TOTAL_VERSES}
            </span>

            <div className="flex items-center gap-2">
              {verse.approximate && (
                <span
                  title="This verse contains compressed Elu wordplay; the explanation gives the general sense."
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30"
                >
                  General sense
                </span>
              )}

              {/* Language Switcher */}
              <div
                role="group"
                aria-label="Explanation language"
                className="inline-flex rounded-full bg-black/30 p-0.5 border border-line text-xs"
              >
                {(["both", "si", "en"] as LangMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => changeLang(m)}
                    className={`px-2.5 py-1 rounded-full transition-colors ${
                      lang === m
                        ? "bg-gold text-[#030816] font-medium"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {m === "both" ? "Both" : m === "si" ? "සිංහල" : "EN"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            lang="si"
            className="font-elu text-xl sm:text-2xl md:text-[28px] leading-[1.95] text-ink space-y-2.5 py-2"
          >
            {verse.lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: idx * 0.11 }}
                className="tracking-wide"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <div className="rule-gold my-5" />

          {/* Prev / Next Controls */}
          <div className="flex items-center justify-between gap-4">
            {prevHref ? (
              <Link
                href={prevHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-gold/20 text-ink hover:text-gold border border-line transition-all text-sm"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Verse {verse.n - 1}</span>
              </Link>
            ) : (
              <span className="text-xs text-ink-faint px-2">Beginning of poem</span>
            )}

            {nextHref ? (
              <Link
                href={nextHref}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold text-[#030816] font-medium hover:brightness-110 shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all text-sm"
              >
                <span>Verse {verse.n + 1}</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/journey"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold text-[#030816] font-medium text-sm"
              >
                <span>Complete Journey</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Explanations Grid */}
        <div
          className={`grid gap-4 ${
            lang === "both" ? "md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {(lang === "both" || lang === "si") && (
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="text-xs uppercase tracking-wider text-gold mb-2 font-medium">
                සරල සිංහල තේරුම · Modern Sinhala
              </div>
              <p lang="si" className="font-sinhala text-sm sm:text-base leading-relaxed text-ink">
                {verse.si}
              </p>
            </div>
          )}

          {(lang === "both" || lang === "en") && (
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="text-xs uppercase tracking-wider text-gold mb-2 font-medium">
                Plain English Explanation
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-ink">
                {verse.en}
              </p>
            </div>
          )}
        </div>

        {(verse.note || verse.approximate) && (
          <div className="mt-4 glass rounded-xl px-4 py-3 text-xs sm:text-sm text-ink-soft flex flex-col gap-1">
            {verse.note && <p>{verse.note}</p>}
            {verse.approximate && (
              <p className="text-ink-faint">
                Note: The original Elu phrasing in this verse is compact and layered; this explanation captures the overall meaning for learners.
              </p>
            )}
          </div>
        )}

        <JourneyRail verse={verse} />
      </div>
    </MotionConfig>
  );
}
