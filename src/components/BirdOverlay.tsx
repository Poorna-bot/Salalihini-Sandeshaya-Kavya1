"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createStarlingRig } from "@/lib/myna";
import { markReady, useAppStore } from "@/lib/loading";
import { useJourney } from "@/lib/useJourney";

function StarlingActor({ progress, calmMode }: { progress: number; calmMode: boolean }) {
  const rig = useMemo(() => createStarlingRig(), []);
  const swoopRef = useRef(0);
  const lastProgress = useRef(progress);

  useEffect(() => {
    markReady("bird");
  }, []);

  useEffect(() => {
    if (Math.abs(progress - lastProgress.current) > 0.001) {
      swoopRef.current = 1.0;
      lastProgress.current = progress;
    }
  }, [progress]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    swoopRef.current = Math.max(0, swoopRef.current - delta * 1.6);

    const flapSpeed = calmMode ? 4.2 : 9.5;
    const flapAngle = Math.sin(t * flapSpeed) * (calmMode ? 0.28 : 0.62);
    rig.leftWing.rotation.z = flapAngle;
    rig.rightWing.rotation.z = -flapAngle;
    rig.tail.rotation.x = Math.sin(t * 3.0) * 0.08;

    // Clamped inside visible viewport [-1.6, 1.6]
    const targetX = THREE.MathUtils.lerp(-1.25, 1.25, progress) + Math.sin(t * 0.7) * 0.25;
    const targetY = 0.85 + Math.cos(t * 1.1) * (calmMode ? 0.06 : 0.18) + swoopRef.current * 0.22;

    rig.root.position.x = THREE.MathUtils.lerp(rig.root.position.x, targetX, Math.min(1, delta * 3));
    rig.root.position.y = THREE.MathUtils.lerp(rig.root.position.y, targetY, Math.min(1, delta * 3));
    rig.root.rotation.y = 0.65 + Math.sin(t * 0.5) * 0.12;
    rig.root.rotation.z = -swoopRef.current * 0.2;
  });

  return <primitive object={rig.root} scale={0.55} />;
}

export default function BirdOverlay() {
  const { progress } = useJourney();
  const { calmMode } = useAppStore();

  return (
    <div className="fixed inset-0 -z-[5] pointer-events-none" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 4.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.75} color="#bae6fd" />
        <directionalLight position={[3, 5, 4]} intensity={1.3} color="#00e5ff" />
        <StarlingActor progress={progress} calmMode={calmMode} />
      </Canvas>
    </div>
  );
}
