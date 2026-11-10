import * as THREE from "three";

export const shared = {
  fogColor: new THREE.Color("#040d26"),
  rimColor: new THREE.Color("#00e5ff"),
  groundColor: new THREE.Color("#020817"),
  night: 0.25,
  time: 0,
};

export function makeFlatMaterial(color: string, emissive?: string, emissiveIntensity = 0.6) {
  const params: THREE.MeshStandardMaterialParameters = {
    color,
    flatShading: true,
    roughness: 0.78,
    metalness: 0.15,
  };
  if (emissive) {
    params.emissive = new THREE.Color(emissive);
    params.emissiveIntensity = emissiveIntensity;
  }
  return new THREE.MeshStandardMaterial(params);
}
