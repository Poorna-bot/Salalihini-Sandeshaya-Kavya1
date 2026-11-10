import * as THREE from "three";
import { makeFlatMaterial } from "./kit";

export function buildPalaceGroup(): THREE.Group {
  const g = new THREE.Group();
  const baseMat = makeFlatMaterial("#0a1936");
  const roofMat = makeFlatMaterial("#0f2c59");
  const neonMat = makeFlatMaterial("#00e5ff", "#00e5ff", 1.4);

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.4), baseMat);
  body.position.y = 0.45;
  g.add(body);

  const upper = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 1.0), baseMat);
  upper.position.y = 1.1;
  g.add(upper);

  const roof1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 0.55, 4), roofMat);
  roof1.rotation.y = Math.PI / 4;
  roof1.position.y = 1.05;
  g.add(roof1);

  const roof2 = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.5, 4), roofMat);
  roof2.rotation.y = Math.PI / 4;
  roof2.position.y = 1.65;
  g.add(roof2);

  // Neon-blue finials
  for (const dx of [-0.45, 0, 0.45]) {
    const finial = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), neonMat);
    finial.position.set(dx, 1.98, 0);
    g.add(finial);
  }
  return g;
}

export function buildStupaGroup(): THREE.Group {
  const g = new THREE.Group();
  const domeMat = makeFlatMaterial("#e0f2fe", "#00b4d8", 0.22);
  const spireMat = makeFlatMaterial("#00e5ff", "#00e5ff", 1.2);
  const foliageMat = makeFlatMaterial("#083344");

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.3, 0.25, 12), domeMat);
  base.position.y = 0.12;
  g.add(base);

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    domeMat
  );
  dome.position.y = 0.24;
  g.add(dome);

  const harmika = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.24, 0.38), domeMat);
  harmika.position.y = 1.25;
  g.add(harmika);

  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.75, 8), spireMat);
  spire.position.y = 1.72;
  g.add(spire);

  // Sacred Bo tree beside the stupa
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.14, 0.7, 6),
    makeFlatMaterial("#1e293b")
  );
  trunk.position.set(1.45, 0.35, 0.3);
  g.add(trunk);

  const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 0), foliageMat);
  crown.position.set(1.45, 0.9, 0.3);
  g.add(crown);

  return g;
}

export function buildKovilGroup(): THREE.Group {
  const g = new THREE.Group();
  const tierMat = makeFlatMaterial("#0c2448");
  const lampMat = makeFlatMaterial("#00e5ff", "#00e5ff", 1.5);

  for (let i = 0; i < 4; i++) {
    const s = 1 - i * 0.18;
    const tier = new THREE.Mesh(new THREE.BoxGeometry(1.1 * s, 0.42, 0.85 * s), tierMat);
    tier.position.y = 0.21 + i * 0.4;
    g.add(tier);
  }

  for (const dx of [-0.65, 0.65]) {
    const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), lampMat);
    lamp.position.set(dx, 0.32, 0.65);
    g.add(lamp);
  }
  return g;
}

export function buildTempleGroup(): THREE.Group {
  const g = new THREE.Group();
  const wallMat = makeFlatMaterial("#0d2242");
  const roofMat = makeFlatMaterial("#163b6e");
  const glowMat = makeFlatMaterial("#00e5ff", "#00e5ff", 1.3);

  for (let i = 0; i < 3; i++) {
    const w = 1.6 - i * 0.35;
    const box = new THREE.Mesh(new THREE.BoxGeometry(w, 0.42, w * 0.75), wallMat);
    box.position.y = 0.21 + i * 0.45;
    g.add(box);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.75, 0.3, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 0.48 + i * 0.45;
    g.add(roof);
  }

  const pinnacle = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 6), glowMat);
  pinnacle.position.y = 1.72;
  g.add(pinnacle);

  return g;
}

export function buildPalmTree(): THREE.Group {
  const g = new THREE.Group();
  const trunkMat = makeFlatMaterial("#09192e");
  const leafMat = makeFlatMaterial("#0d3b52");

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 1.35, 6), trunkMat);
  trunk.position.y = 0.67;
  trunk.rotation.z = 0.08;
  g.add(trunk);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const frond = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.65, 4), leafMat);
    frond.position.set(Math.cos(angle) * 0.22 - 0.05, 1.32, Math.sin(angle) * 0.22);
    frond.rotation.z = Math.PI / 2.6;
    frond.rotation.y = -angle;
    g.add(frond);
  }
  return g;
}
