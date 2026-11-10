"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  LANDMARKS,
  Landmark,
  MAP,
  getRouteCurve,
  sampleTerrainHeight,
  verseToRouteFraction,
} from "@/lib/geo";
import { createStarlingRig } from "@/lib/myna";
import { markReady } from "@/lib/loading";

type CameraMode = "overview" | "follow" | "free";

function TerrainScene({
  verse,
  selectedLandmark,
  cameraMode,
}: {
  verse: number;
  selectedLandmark: Landmark;
  cameraMode: CameraMode;
}) {
  const routeCurve = useMemo(() => getRouteCurve(), []);
  const birdRig = useMemo(() => createStarlingRig(), []);

  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(MAP.width, MAP.depth, MAP.segX, MAP.segZ);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, sampleTerrainHeight(x, z));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const routeLineGeo = useMemo(() => {
    const pts = routeCurve.getPoints(120);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [routeCurve]);

  useEffect(() => {
    markReady("map");
  }, []);

  useFrame((state, delta) => {
    const frac = verseToRouteFraction(verse);
    const pt = routeCurve.getPointAt(frac);
    const tangent = routeCurve.getTangentAt(frac);

    birdRig.root.position.lerp(pt, Math.min(1, delta * 6));
    birdRig.root.lookAt(pt.clone().add(tangent));

    const t = state.clock.getElapsedTime();
    const flap = Math.sin(t * 9) * 0.55;
    birdRig.leftWing.rotation.z = flap;
    birdRig.rightWing.rotation.z = -flap;

    if (cameraMode === "follow") {
      const camPos = pt.clone().add(new THREE.Vector3(-3.5, 3.2, 4.5));
      state.camera.position.lerp(camPos, Math.min(1, delta * 3));
      state.camera.lookAt(pt);
    } else if (cameraMode === "overview") {
      const targetPos = new THREE.Vector3(selectedLandmark.x - 4, 14, selectedLandmark.z + 14);
      state.camera.position.lerp(targetPos, Math.min(1, delta * 2.5));
      state.camera.lookAt(selectedLandmark.x, 0.5, selectedLandmark.z);
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} color="#7dd3fc" />
      <directionalLight position={[15, 25, 10]} intensity={1.35} color="#00e5ff" />

      {/* Terrain */}
      <mesh geometry={terrainGeo}>
        <meshStandardMaterial color="#07223f" flatShading roughness={0.82} />
      </mesh>

      {/* Water plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[MAP.width, MAP.depth]} />
        <meshStandardMaterial
          color="#021329"
          emissive="#00b4d8"
          emissiveIntensity={0.2}
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* Neon-Blue Flight Route */}
      <line geometry={routeLineGeo}>
        <lineBasicMaterial color="#00e5ff" linewidth={2} />
      </line>

      {/* Landmarks */}
      {LANDMARKS.map((lm) => {
        const y = Math.max(0.2, sampleTerrainHeight(lm.x, lm.z));
        const active = lm.id === selectedLandmark.id;
        return (
          <group key={lm.id} position={[lm.x, y, lm.z]}>
            <mesh position={[0, lm.pin * 0.5, 0]}>
              <cylinderGeometry args={[0.04, 0.04, lm.pin, 6]} />
              <meshBasicMaterial color={active ? "#00e5ff" : "#38bdf8"} />
            </mesh>
            <mesh position={[0, lm.pin, 0]}>
              <octahedronGeometry args={[active ? 0.34 : 0.22, 0]} />
              <meshStandardMaterial
                color="#00e5ff"
                emissive="#00e5ff"
                emissiveIntensity={active ? 1.6 : 0.8}
              />
            </mesh>
          </group>
        );
      })}

      {/* Small Starling on the Route */}
      <primitive object={birdRig.root} scale={0.32} />
    </>
  );
}

export default function MapExperience() {
  const [verse, setVerse] = useState(1);
  const [selectedId, setSelectedId] = useState<string>("kotte");
  const [cameraMode, setCameraMode] = useState<CameraMode>("overview");

  const selectedLandmark =
    LANDMARKS.find((l) => l.id === selectedId) ?? LANDMARKS[0];

  return (
    <div className="relative w-full h-screen bg-[#030816] overflow-hidden">
      <Canvas camera={{ position: [-6, 16, 18], fov: 45 }} dpr={[1, 1.5]}>
        <TerrainScene
          verse={verse}
          selectedLandmark={selectedLandmark}
          cameraMode={cameraMode}
        />
      </Canvas>

      {/* Left Landmark Panel & Scrubber */}
      <div className="fixed bottom-4 left-4 right-4 md:top-20 md:bottom-6 md:right-auto md:w-96 z-20 flex flex-col justify-end md:justify-between pointer-events-none gap-3">
        <div className="glass rounded-2xl p-4 pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-lg text-gold">
              3D Route Map · Kotte to Kelaniya
            </h1>
            <div className="inline-flex rounded-full bg-black/40 p-0.5 border border-line text-[11px]">
              {(["overview", "follow", "free"] as CameraMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCameraMode(mode)}
                  className={`px-2.5 py-1 rounded-full capitalize ${
                    cameraMode === mode
                      ? "bg-gold text-[#030816] font-medium"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto thin-scroll py-1">
            {LANDMARKS.map((lm) => (
              <button
                key={lm.id}
                type="button"
                onClick={() => {
                  setSelectedId(lm.id);
                  setVerse(lm.firstVerse);
                }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  selectedId === lm.id
                    ? "bg-gold text-[#030816] border-gold font-medium shadow-[0_0_12px_rgba(0,229,255,0.45)]"
                    : "bg-white/5 text-ink-soft border-line hover:text-ink"
                }`}
              >
                {lm.en}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4 pointer-events-auto">
          <div className="flex items-center justify-between text-xs text-gold mb-1">
            <span lang="si" className="font-sinhala">
              {selectedLandmark.si}
            </span>
            <span>Verses {selectedLandmark.verses}</span>
          </div>
          <h2 className="text-base font-medium text-ink mb-1">
            {selectedLandmark.en}
          </h2>
          <p lang="si" className="font-sinhala text-xs text-ink-soft mb-1">
            {selectedLandmark.blurbSi}
          </p>
          <p className="text-xs text-ink-soft mb-3">{selectedLandmark.blurbEn}</p>

          <div className="mb-3">
            <div className="flex justify-between text-xs text-ink-soft mb-1">
              <span>Fly along route (Verse {verse})</span>
              <span className="font-mono text-gold">{verse} / 111</span>
            </div>
            <input
              type="range"
              min={1}
              max={111}
              value={verse}
              onChange={(e) => setVerse(Number(e.target.value))}
              aria-label="Scrub verse along route"
              className="w-full accent-[#00e5ff]"
            />
          </div>

          <Link
            href={selectedLandmark.firstVerse === 1 ? "/" : `/verse/${selectedLandmark.firstVerse}`}
            className="inline-flex items-center justify-center w-full py-2 rounded-full bg-gold text-[#030816] font-medium text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:brightness-110 transition"
          >
            Read these verses (Verse {selectedLandmark.firstVerse}) →
          </Link>
        </div>
      </div>
    </div>
  );
}
