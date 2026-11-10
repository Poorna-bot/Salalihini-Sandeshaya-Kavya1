import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { DEVELOPER } from "@/data/developer";
import { Engineer } from "@/components/Engineer";
import { Reveal } from "@/components/Reveal";
import { HeartIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About the Developer",
  description: `About ${DEVELOPER.name || "the developer"} — Made by an A/L Student, for the community.`,
};

export default function DeveloperPage() {
  const promises = [
    {
      title: "Free to read",
      si: "සැමට නොමිලේ කියවිය හැකිය.",
      desc: "Every verse, explanation, and 3D view is open to students and readers everywhere at no cost.",
    },
    {
      title: "No ads, no tracking",
      si: "දැන්වීම් හෝ ලුහුබැඳීම් කිසිවක් නැත.",
      desc: "Zero analytics scripts, zero cookies, and zero distractions between you and the poem.",
    },
    {
      title: "Honest about its limits",
      si: "සීමාවන් ගැන අවංකව සඳහන් කරයි.",
      desc: "Where a fifteenth-century Elu verse is dense or ambiguous, it is openly marked as a general-sense learner's aid.",
    },
  ];

  const waysToHelp = [
    {
      num: "01",
      title: "Check an explanation",
      desc: "If a Sinhala or English paraphrase can be clearer or more faithful to the sannaya, open a content correction issue.",
    },
    {
      num: "02",
      title: "Share it with a student",
      desc: "Pass the link to an O/L or A/L student, teacher, or anyone curious about classic Sinhala literature.",
    },
    {
      num: "03",
      title: "Tell me what is broken",
      desc: "Report layout bugs, device quirks, or typos on GitHub so the experience keeps improving.",
    },
  ];

  const techStack = ["Next.js", "React", "three.js", "Tailwind CSS", "TypeScript"];

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-24 px-4 sm:px-6 space-y-12">
      {/* Hero Section */}
      <Reveal className="grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs">
            <span>Open-Source Cultural Project</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-ink leading-tight">
            Made by {DEVELOPER.name ? `${DEVELOPER.name} — ` : ""}an A/L Student, for the community.
          </h1>
          <p lang="si" className="font-sinhala text-base sm:text-lg text-gold">
            පූර්ණ තලීෂ (A/L ශිෂ්‍යයෙකු) විසින්, ප්‍රජාව වෙනුවෙන්.
          </p>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Built with care so anyone can experience <em>Salalihini Sandeshaya</em> in
            a calm, living neon-blue 3D world while reading all 111 verses in original
            Elu Sinhala alongside plain Sinhala and English explanations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {DEVELOPER.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gold text-[#030816] font-medium text-xs sm:text-sm shadow-[0_0_16px_rgba(0,229,255,0.4)] hover:brightness-110 transition"
              >
                {link.label}
              </a>
            ))}

            {DEVELOPER.contactUrl && (
              <a
                href={DEVELOPER.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full glass text-ink text-xs sm:text-sm hover:border-gold transition"
              >
                {DEVELOPER.contactLabel || "Contact"}
              </a>
            )}

            {DEVELOPER.sponsorUrl && (
              <a
                href={DEVELOPER.sponsorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs sm:text-sm text-ink hover:border-[#ea4aaa] transition"
              >
                <span className="text-[#ea4aaa]">
                  <HeartIcon className="w-4 h-4" />
                </span>
                <span>Sponsor</span>
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="glass rounded-3xl p-6">
            <Engineer />
          </div>
        </div>
      </Reveal>

      {/* Why it exists */}
      <Reveal className="glass rounded-2xl p-6 sm:p-8 space-y-3">
        <h2 className="font-display text-2xl sm:text-3xl text-gold">Why it exists</h2>
        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
          This site is a gift to learners and literature lovers, not a commercial product.
          Classical poems often stay locked inside heavy commentaries; pairing the original
          verses with a responsive 3D journey and honest, approachable explanations makes
          it easier to keep reading from the first blessing at Kotte to the final prayer
          at Kelaniya.
        </p>
      </Reveal>

      {/* Three Promises */}
      <Reveal className="grid sm:grid-cols-3 gap-4">
        {promises.map((p) => (
          <div key={p.title} className="glass rounded-2xl p-5 space-y-2">
            <h3 className="font-display text-xl text-gold">{p.title}</h3>
            <p lang="si" className="font-sinhala text-xs text-ink">
              {p.si}
            </p>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </Reveal>

      {/* How you can help */}
      <Reveal className="space-y-4">
        <h2 className="font-display text-2xl sm:text-3xl text-ink">How you can help</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {waysToHelp.map((w) => (
            <div key={w.num} className="glass rounded-2xl p-5 space-y-2">
              <span className="font-mono text-xs text-gold">{w.num}</span>
              <h3 className="text-base font-medium text-ink">{w.title}</h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Open source */}
      {DEVELOPER.repoUrl && (
        <Reveal className="glass rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl text-gold">Open source</h2>
          <p className="text-sm text-ink-soft">
            The code is MIT-licensed and the explanations are shared under CC BY-SA 4.0.
            Contributions from students, teachers, and developers are always welcome.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={DEVELOPER.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gold text-[#030816] font-medium text-xs sm:text-sm"
            >
              View the source
            </a>
            <a
              href={`${DEVELOPER.repoUrl}#contributing`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-gold/20 border border-line text-ink text-xs sm:text-sm transition"
            >
              How to contribute
            </a>
            <a
              href={`${DEVELOPER.repoUrl}/issues/new?template=content_correction.yml`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-gold/20 border border-line text-ink text-xs sm:text-sm transition"
            >
              Correct a verse
            </a>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-faint mr-1">Built with:</span>
            {techStack.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-black/30 border border-line text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {/* Closing line */}
      <Reveal className="text-center pt-4 space-y-2">
        <p lang="si" className="font-elu text-xl text-gold">
          සැළලිහිණිය යළිත් පියඹයි.
        </p>
        <p className="font-display italic text-lg text-ink-soft">
          The starling flies again.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs sm:text-sm hover:bg-gold hover:text-[#030816] transition"
          >
            Return to Verse 1 →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
