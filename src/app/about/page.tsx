import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS } from "@/data";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About the Poem",
  description: "The story, poet, historical setting, and sources of Salalihini Sandeshaya.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto pt-28 pb-24 px-4 sm:px-6 space-y-8">
      <Reveal>
        <p className="text-xs uppercase tracking-widest text-gold mb-2">
          Fifteenth-Century Messenger Poem
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-ink mb-3">
          About the Poem
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Around 1450, in the royal city of Jayawardhanapura Kotte, the monk-poet
          Thotagamuwe Sri Rahula composed a prayer in 111 verses and entrusted it to
          a starling (<em>salalihini</em>). Her one-day flight from the palace at Kotte
          to the shrine of the god Vibhishana at Kelaniya asks for a son to be born to
          Princess Ulakudaya Devi, daughter of King Parakramabahu VI.
        </p>
      </Reveal>

      <Reveal className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-display text-2xl text-gold">
          The Poet &amp; the Royal Court of Kotte
        </h2>
        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
          Thotagamuwe Sri Rahula (c. 1408–1491) headed the renowned Vijayabahu Pirivena
          and was honoured as <em>Shadbhasha Parameshwara</em> (&ldquo;master of six
          languages&rdquo;). During the long reign of King Parakramabahu VI (1412–1467),
          the island was united under Kotte, and Sinhala poetry flourished. Along the
          way, verse 29 salutes Prince Sapumal returning victorious from the northern
          campaign in Jaffna.
        </p>
      </Reveal>

      <Reveal className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-display text-2xl text-gold">
          How to Read an Elu Verse
        </h2>
        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
          The poem is composed in <strong>Elu</strong>, the classical literary form of
          Sinhala, set to the surging <em>samudraghosa</em> (&ldquo;sound of the ocean&rdquo;)
          metre. Because Elu compresses words and weaves layered metaphors, even native
          Sinhala speakers read it alongside a paraphrase. Every verse here pairs the
          original lines with plain modern Sinhala and plain English explanations.
        </p>
      </Reveal>

      <Reveal className="glass rounded-2xl p-6 space-y-3">
        <h2 className="font-display text-2xl text-gold">
          Honest Notes on the Text &amp; Explanations
        </h2>
        <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
          The Elu verse text is fetched directly from the open edition on Sinhala
          Wikibooks (originally digitized by e-Pothgula under CC BY-SA 4.0). In that
          source, Verse 1 preserves two lines rather than four; we keep the source text
          unchanged rather than inventing lines. Explanations on this site are written
          as clear learner&apos;s aids for students and general readers. Verses with
          especially compressed wordplay carry a <strong>General sense</strong> badge.
        </p>
      </Reveal>

      <Reveal className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-2xl text-gold">
          The 20 Sections
        </h2>
        <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
          {SECTIONS.map((s, i) => (
            <Link
              key={s.id}
              href={s.from === 1 ? "/" : `/verse/${s.from}`}
              className="p-3 rounded-xl bg-white/5 hover:bg-gold/15 border border-line transition flex items-center justify-between"
            >
              <span>
                <strong className="text-gold mr-1.5">{i + 1}.</strong>
                <span lang="si" className="font-sinhala mr-1.5">{s.si}</span>
                <span className="text-ink-soft">({s.en})</span>
              </span>
              <span className="font-mono text-xs text-gold">
                {s.from === s.to ? s.from : `${s.from}–${s.to}`}
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="glass rounded-2xl p-6 space-y-2 text-xs sm:text-sm text-ink-soft">
        <h2 className="font-display text-xl text-gold">Credits &amp; Licences</h2>
        <p>
          • <strong>Poem Text:</strong>{" "}
          <a
            href="https://si.wikibooks.org/wiki/%E0%B7%83%E0%B7%90%E0%B7%85%E0%B6%BD%E0%B7%92%E0%B7%84%E0%B7%92%E0%B6%AB%E0%B7%92_%E0%B7%83%E0%B6%B1%E0%B7%8A%E0%B6%AF%E0%B7%9A%E0%B7%81%E0%B6%BA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline"
          >
            Sinhala Wikibooks (සැළලිහිණි සන්දේශය)
          </a>{" "}
          / e-Pothgula (CC BY-SA 4.0).
        </p>
        <p>
          • <strong>Typography:</strong> Noto Serif Sinhala, Noto Sans Sinhala, and
          Cormorant Garamond (SIL Open Font License 1.1 via Google Fonts), and Geist by Vercel.
        </p>
      </Reveal>
    </div>
  );
}
