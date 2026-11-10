import * as THREE from "three";
import { makeFlatMaterial } from "./kit";

export interface StarlingRig {
  root: THREE.Group;
  leftWing: THREE.Group;
  rightWing: THREE.Group;
  tail: THREE.Mesh;
  head: THREE.Group;
}

/**
 * Procedurally builds a faceted low-poly starling (salalihini) with a dark
 * iridescent midnight-blue body, electric neon-cyan wing accents, and a golden-cyan beak.
 */
export function createStarlingRig(): StarlingRig {
  const root = new THREE.Group();

  const bodyMat = makeFlatMaterial("#081730", "#0284c7", 0.28);
  const wingEdgeMat = makeFlatMaterial("#00b4d8", "#00e5ff", 0.55);
  const beakMat = makeFlatMaterial("#38bdf8", "#00e5ff", 0.75);

  // Sleek faceted body
  const bodyGeo = new THREE.ConeGeometry(0.24, 0.95, 6);
  bodyGeo.rotateX(Math.PI / 2);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  root.add(body);

  // Head & beak
  const head = new THREE.Group();
  head.position.set(0, 0.08, 0.42);
  const skull = new THREE.Mesh(new THREE.DodecahedronGeometry(0.17, 0), bodyMat);
  head.add(skull);

  const beakGeo = new THREE.ConeGeometry(0.06, 0.26, 4);
  beakGeo.rotateX(Math.PI / 2);
  const beak = new THREE.Mesh(beakGeo, beakMat);
  beak.position.set(0, -0.01, 0.22);
  head.add(beak);
  root.add(head);

  // Tail
  const tailGeo = new THREE.BoxGeometry(0.24, 0.03, 0.38);
  const tail = new THREE.Mesh(tailGeo, wingEdgeMat);
  tail.position.set(0, -0.02, -0.52);
  root.add(tail);

  // Left & Right wings made of flat low-poly feather plates
  const leftWing = new THREE.Group();
  leftWing.position.set(-0.16, 0.05, 0.05);
  const rightWing = new THREE.Group();
  rightWing.position.set(0.16, 0.05, 0.05);

  for (let i = 0; i < 3; i++) {
    const span = 0.52 - i * 0.1;
    const chord = 0.24 - i * 0.04;
    const mat = i === 2 ? wingEdgeMat : bodyMat;

    const lFeather = new THREE.Mesh(new THREE.BoxGeometry(span, 0.025, chord), mat);
    lFeather.position.set(-span * 0.5 - i * 0.12, 0, -i * 0.07);
    leftWing.add(lFeather);

    const rFeather = new THREE.Mesh(new THREE.BoxGeometry(span, 0.025, chord), mat);
    rFeather.position.set(span * 0.5 + i * 0.12, 0, -i * 0.07);
    rightWing.add(rFeather);
  }

  root.add(leftWing);
  root.add(rightWing);

  return { root, leftWing, rightWing, tail, head };
}
