import React from "react";
import type { Metadata } from "next";
import MapExperience from "@/components/MapExperience";

export const metadata: Metadata = {
  title: "3D Map",
  description: "Explore the 3D terrain map of the starling's route from Kotte to Kelaniya.",
};

export default function MapPage() {
  return <MapExperience />;
}
