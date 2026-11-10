import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ALL_VERSES, getVerse, parseVerseNumber } from "@/data";
import { VerseReader } from "@/components/VerseReader";

export function generateStaticParams() {
  return ALL_VERSES.filter((v) => v.n >= 2).map((v) => ({
    n: String(v.n),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n: raw } = await params;
  const num = parseVerseNumber(raw);
  const verse = num ? getVerse(num) : null;
  if (!verse) {
    return { title: "Verse Not Found" };
  }
  return {
    title: `Verse ${verse.n} · ${verse.section.en}`,
    description: verse.en,
    alternates: {
      canonical: verse.n === 1 ? "/" : `/verse/${verse.n}`,
    },
    openGraph: {
      title: `Verse ${verse.n} · ${verse.section.en} · Salalihini Sandeshaya`,
      description: verse.en,
    },
  };
}

async function VerseContent({ params }: { params: Promise<{ n: string }> }) {
  const { n: raw } = await params;
  const num = parseVerseNumber(raw);
  if (!num) notFound();
  if (num === 1) redirect("/");
  const verse = getVerse(num);
  if (!verse) notFound();
  return <VerseReader verse={verse} />;
}

export default function VersePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VerseContent params={params} />
    </Suspense>
  );
}
