import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="glass rounded-3xl p-8 sm:p-12 max-w-md space-y-4">
        <p className="font-mono text-xs text-gold uppercase tracking-widest">404</p>
        <h1 className="font-display text-3xl text-ink">
          This verse is out of reach
        </h1>
        <p className="text-sm text-ink-soft">
          The poem has 111 verses along the flight path from Kotte to Kelaniya.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gold text-[#030816] font-medium text-sm shadow-[0_0_16px_rgba(0,229,255,0.4)]"
        >
          Return to Verse 1
        </Link>
      </div>
    </div>
  );
}
