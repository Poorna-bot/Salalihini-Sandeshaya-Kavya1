"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { THEMES, nightOf } from "@/lib/themes";
import { useJourney } from "@/lib/useJourney";
import { markReady, useAppStore } from "@/lib/loading";
import {
  buildKovilGroup,
  buildPalaceGroup,
  buildPalmTree,
  buildStupaGroup,
  buildTempleGroup,
} from "@/lib/models";
import { Silhouette, ThemeId } from "@/data/types";

const SKY_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`;

const SKY_FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uBottom;
uniform vec4 uSun;
uniform vec3 uSunColor;
uniform vec4 uMoon;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  float y = clamp(vUv.y, 0.0, 1.0);
  vec3 col = mix(uBottom, uMid, smoothstep(0.0, 0.52, y));
  col = mix(col, uTop, smoothstep(0.45, 1.0, y));

  vec2 ndc = vUv * 2.0 - 1.0;

  if (uSun.w > 0.01) {
    float ds = length(ndc - uSun.xy);
    float glow = exp(-ds * 3.2 / max(0.15, uSun.z)) * uSun.w;
    float disc = smoothstep(uSun.z * 0.22, uSun.z * 0.16, ds) * uSun.w;
    col += uSunColor * (glow * 0.55 + disc * 0.75);
  }

  if (uMoon.w > 0.01) {
    float dm = length(ndc - uMoon.xy);
    float mglow = exp(-dm * 6.0 / max(0.06, uMoon.z)) * uMoon.w;
    float mdisc = smoothstep(uMoon.z, uMoon.z * 0.78, dm) * uMoon.w;
    col += vec3(0.75, 0.93, 1.0) * (mglow * 0.38 + mdisc * 0.85);
  }

  // Subtle 8-bit dither to prevent any sky gradient banding
  float dither = (hash12(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dither, 1.0);
}
`;

function ValleyWorld({
  themeId,
  silhouette,
  calmMode,
}: {
  themeId: ThemeId;
  silhouette: Silhouette;
  calmMode: boolean;
}) {
  const snapped = useRef(false);
  const skyMatRef = useRef<THREE.ShaderMaterial>(null);
  const propGroupRef = useRef<THREE.Group>(null);

  const skyUniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color(THEMES.dawn.top) },
      uMid: { value: new THREE.Color(THEMES.dawn.mid) },
      uBottom: { value: new THREE.Color(THEMES.dawn.bottom) },
      uSun: { value: new THREE.Vector4(...THEMES.dawn.sun) },
      uSunColor: { value: new THREE.Color(THEMES.dawn.sunColor) },
      uMoon: { value: new THREE.Vector4(...THEMES.dawn.moon) },
    }),
    []
  );

  const silhouetteGroup = useMemo(() => {
    const g = new THREE.Group();
    if (silhouette === "city") {
      g.add(buildPalaceGroup());
    } else if (silhouette === "stupa") {
      g.add(buildStupaGroup());
    } else if (silhouette === "kovil") {
      g.add(buildKovilGroup());
    } else if (silhouette === "temple") {
      g.add(buildTempleGroup());
    } else if (silhouette === "palms") {
      for (const dx of [-2.2, -0.9, 1.1, 2.3]) {
        const p = buildPalmTree();
        p.position.x = dx;
        g.add(p);
      }
    }
    return g;
  }, [silhouette]);

  useEffect(() => {
    markReady("scene");
  }, []);

  useFrame((_, delta) => {
    const target = THEMES[themeId] ?? THEMES.dawn;
    const rate = !snapped.current ? 1.0 : Math.min(1, delta * (calmMode ? 1.5 : 3.2));
    snapped.current = true;

    if (skyMatRef.current) {
      skyMatRef.current.uniforms.uTop.value.lerp(new THREE.Color(target.top), rate);
      skyMatRef.current.uniforms.uMid.value.lerp(new THREE.Color(target.mid), rate);
      skyMatRef.current.uniforms.uBottom.value.lerp(new THREE.Color(target.bottom), rate);
      skyMatRef.current.uniforms.uSunColor.value.lerp(new THREE.Color(target.sunColor), rate);
    }

    if (propGroupRef.current && !calmMode) {
      propGroupRef.current.rotation.y = Math.sin(performance.now() * 0.00025) * 0.06;
    }
  });

  const night = nightOf(THEMES[themeId] ?? THEMES.dawn);

  return (
    <>
      <mesh frustumCulled={false}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={skyMatRef}
          vertexShader={SKY_VERT}
          fragmentShader={SKY_FRAG}
          uniforms={skyUniforms}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      <ambientLight intensity={0.45 + (1 - night) * 0.35} color="#7dd3fc" />
      <directionalLight position={[4, 8, 5]} intensity={1.1} color="#00e5ff" />

      <group ref={propGroupRef} position={[0, -2.1, -6.5]}>
        <primitive object={silhouetteGroup} />
      </group>
    </>
  );
}

export default function SceneRoot() {
  const { themeId, silhouette } = useJourney();
  const { calmMode } = useAppStore();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.6, 5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ValleyWorld themeId={themeId} silhouette={silhouette} calmMode={calmMode} />
      </Canvas>
    </div>
  );
}
