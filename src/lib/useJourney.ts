"use client";

import { usePathname } from "next/navigation";
import { getVerse, TOTAL_VERSES, parseVerseNumber } from "@/data";
import { Silhouette, ThemeId } from "@/data/types";

export interface JourneyState {
  themeId: ThemeId;
  silhouette: Silhouette;
  progress: number;
  verseNumber: number | null;
  isVersePage: boolean;
}

export function useJourney(): JourneyState {
  const pathname = usePathname() || "/";

  if (pathname === "/") {
    const v = getVerse(1)!;
    return {
      themeId: v.section.theme,
      silhouette: v.section.silhouette,
      progress: 0,
      verseNumber: 1,
      isVersePage: true,
    };
  }

  if (pathname.startsWith("/verse/")) {
    const raw = pathname.replace("/verse/", "").split("/")[0];
    const n = parseVerseNumber(raw) ?? 1;
    const v = getVerse(n) ?? getVerse(1)!;
    return {
      themeId: v.section.theme,
      silhouette: v.section.silhouette,
      progress: (v.n - 1) / (TOTAL_VERSES - 1),
      verseNumber: v.n,
      isVersePage: true,
    };
  }

  if (pathname.startsWith("/about")) {
    return {
      themeId: "moonlit",
      silhouette: "stupa",
      progress: 0.75,
      verseNumber: null,
      isVersePage: false,
    };
  }

  if (pathname.startsWith("/journey")) {
    return {
      themeId: "dusk",
      silhouette: "city",
      progress: 0.35,
      verseNumber: null,
      isVersePage: false,
    };
  }

  if (pathname.startsWith("/developer")) {
    return {
      themeId: "divine",
      silhouette: "temple",
      progress: 0.9,
      verseNumber: null,
      isVersePage: false,
    };
  }

  return {
    themeId: "dawn",
    silhouette: "none",
    progress: 0,
    verseNumber: null,
    isVersePage: false,
  };
}
