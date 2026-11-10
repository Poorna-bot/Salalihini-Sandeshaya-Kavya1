import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/data";
import { THEMES } from "@/lib/themes";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Journey",
  description: "Follow all 20 sections of the starling's flight from Jayawardhanapura Kotte to Kelaniya.",
};

export default function JourneyPage() {
  return (
    <div className="max-w-4xl mx-auto pt-28 pb-24 px-4 sm:px-6">
      <Reveal className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-gold mb-2">
          From Kotte to Kelaniya
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mb-3">
          The Journey
        </h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-2xl mx-auto">
          Twenty chapters trace a single flight from King Parakramabahu&apos;s court at
          Jayawardhanapura to the shrine of Lord Vibhishana on the banks of the Kelani River.
        </p>
      </Reveal>

      <div className="relative pl-8 sm:pl-12 border-l border-gold/40 space-y-6">
        {SECTIONS.map((sec, idx) => {
          const theme = THEMES[sec.theme];
          const href = sec.from === 1 ? "/" : `/verse/${sec.from}`;
          const rangeLabel =
            sec.from === sec.to ? `Verse ${sec.from}` : `Verses ${sec.from}–${sec.to}`;

          return (
            <Reveal key={sec.id} delay={Math.min(0.25, idx * 0.03)}>
              <div className="relative group">
                <div className="absolute -left-[45px] sm:-left-[61px] top-5 w-7 h-7 rounded-full bg-[#030816] border border-gold text-gold text-xs font-mono flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  {idx + 1}
                </div>

                <Link
                  href={href}
                  className="block glass rounded-2xl p-5 sm:p-6 transition-all hover:border-gold/60 hover:shadow-[0_0_28px_rgba(0,229,255,0.22)]"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme.top}cc, ${theme.mid}55)`,
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span lang="si" className="font-sinhala text-lg text-gold font-medium mr-2">
                        {sec.si}
                      </span>
                      <span className="font-display text-xl text-ink">
                        · {sec.en}
                      </span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 font-mono">
                      {rangeLabel}
                    </span>
                  </div>

                  <p lang="si" className="font-sinhala text-xs sm:text-sm text-ink-soft mb-1.5">
                    {sec.descSi}
                  </p>
                  <p className="text-xs sm:text-sm text-ink-soft">
                    {sec.descEn}
                  </p>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
