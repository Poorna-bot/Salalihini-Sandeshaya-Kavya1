import * as THREE from "three";

export const MAP = {
  width: 68,
  depth: 48,
  segX: 250,
  segZ: 176,
  water: 0,
  skirt: -2.4,
};

export function coastX(z: number): number {
  return -10.5 + 1.8 * Math.sin(0.3 * z + 0.4) + 0.9 * Math.sin(0.85 * z + 2);
}

export const RIVER_CONTROL_POINTS: [number, number][] = [
  [-12, -9.2],
  [-8.5, -9.9],
  [-5.2, -9.1],
  [-2.2, -8.7],
  [0.8, -9.6],
  [4.2, -8.6],
  [8, -10.2],
  [12, -9],
  [17, -11.6],
  [23, -10],
  [34, -12.5],
];

export interface Landmark {
  id: string;
  si: string;
  en: string;
  x: number;
  z: number;
  verses: string;
  firstVerse: number;
  pin: number;
  pad: number;
  blurbSi: string;
  blurbEn: string;
}

export const LANDMARKS: Landmark[] = [
  {
    id: "kotte",
    si: "ජයවර්ධනපුර (කෝට්ටේ)",
    en: "Jayawardhanapura (Kotte)",
    x: 0,
    z: 5,
    verses: "1–16",
    firstVerse: 1,
    pin: 3.2,
    pad: 2.3,
    blurbSi: "දියවන්නා ඔයෙන් හා ප්‍රාකාරවලින් වට වූ සවැනි පරාක්‍රමබාහු රජුගේ රාජකීය අගනුවර.",
    blurbEn: "The moated royal capital of King Parakramabahu VI, ringed by the shimmering waters of Diyawanna.",
  },
  {
    id: "dalada",
    si: "දළදා මැඳුර",
    en: "Tooth Relic shrine",
    x: 1.25,
    z: 5.7,
    verses: "17",
    firstVerse: 17,
    pin: 1.9,
    pad: 0.9,
    blurbSi: "සඳ රැස් මෙන් සුදු කැලුම් විහිදුවන ශ්‍රී දළදා වහන්සේ වැඩ සිටි තෙමහල් ප්‍රාසාදය.",
    blurbEn: "The three-storeyed shrine inside Kotte where the starling bows to the Sacred Tooth Relic.",
  },
  {
    id: "palace",
    si: "රජ මැඳුර",
    en: "The royal palace",
    x: -0.9,
    z: 4.3,
    verses: "18–21",
    firstVerse: 18,
    pin: 2.1,
    pad: 1.0,
    blurbSi: "රන් කොත් හා මුතු වැල්වලින් සැරසුණු පරාක්‍රමබාහු මහ රජුගේ සිංහාසන මන්දිරය.",
    blurbEn: "The glittering palace where the starling receives King Parakramabahu's blessing before departing from Kontagantota.",
  },
  {
    id: "kovil",
    si: "ඊශ්වර කෝවිල",
    en: "Isvara kovil",
    x: -0.8,
    z: 1.3,
    verses: "22–24",
    firstVerse: 22,
    pin: 2.3,
    pad: 0.9,
    blurbSi: "කපුරු දුම් හා දෙමළ ස්තෝත්‍ර ගී මැද සැළලිහිණිය රාත්‍රිය ගත කරන ශිව දේවාලය.",
    blurbEn: "The Shiva shrine north of Kotte where the bird rests overnight amid camphor smoke, bells, and Tamil hymns.",
  },
  {
    id: "samanala",
    si: "සමනොළ කන්ද",
    en: "Samanalakanda (Adam's Peak)",
    x: 29,
    z: 6,
    verses: "25–26",
    firstVerse: 25,
    pin: 8.8,
    pad: 0,
    blurbSi: "සුමන සමන් දෙවිඳුන් පරසතු මලින් පුදන බුදු සිරිපතුල පිහිටි නැගෙනහිර කඳු මුදුන.",
    blurbEn: "Rising in the far east, the sacred peak bearing the Buddha's footprint, worshipped by the deity Saman.",
  },
  {
    id: "sea",
    si: "මහ මුහුද",
    en: "The great ocean",
    x: -15.5,
    z: -3,
    verses: "27–28",
    firstVerse: 27,
    pin: 2.2,
    pad: 0,
    blurbSi: "මුතු, සක් හා පබළු වෙරළෙහි බබළන, බටහිර හා උතුරු දෙසින් පෙනෙන මහා සාගරය.",
    blurbEn: "The western sea tossing white waves skyward along shores strewn with pearls, conches, and coral.",
  },
  {
    id: "sapumal",
    si: "සපුමල් කුමරුගේ සේනාව",
    en: "Prince Sapumal's army",
    x: -1.5,
    z: -1.7,
    verses: "29–40",
    firstVerse: 29,
    pin: 1.9,
    pad: 0.7,
    blurbSi: "යාපා පටුන ජයගෙන නිල්වන් අසු පිට නැඟී පැමිණෙන සේනානායක සපුමල් කුමරු සහ කයිකාවල මුරපොළ.",
    blurbEn: "The victorious procession of Prince Sapumal returning from Jaffna, guarded by the Kaikavala outpost.",
  },
  {
    id: "kitsiri",
    si: "කිත්සිරිමෙවන් වෙහෙර",
    en: "Kitsirimevan Vihara",
    x: -1.0,
    z: -4.2,
    verses: "41–42",
    firstVerse: 41,
    pin: 1.8,
    pad: 0.8,
    blurbSi: "කැලණි ගඟෙන් මෙගොඩ පිහිටි දාගැබ, බෝධිය හා පිළිම වහන්සේ වැඩ සිටින පූජනීය විහාරය.",
    blurbEn: "The afternoon resting temple on the southern bank of the Kelani River.",
  },
  {
    id: "kelani",
    si: "කැලණි ගඟ",
    en: "The Kelani River",
    x: -2.6,
    z: -8.1,
    verses: "43–52",
    firstVerse: 43,
    pin: 1.7,
    pad: 0,
    blurbSi: "දෙපස තුරුලතාවන්ගෙන් සෙවණ වූ, නාග කන්‍යාවන් වීණා වයමින් බුදු ගුණ ගයන සුන්දර ගංගාව.",
    blurbEn: "The cool river shaded by flowering trees where naga maidens sing praises of the Buddha at sunset.",
  },
  {
    id: "kelaniya",
    si: "කැලණි රජමහා විහාරය",
    en: "Kelaniya temple",
    x: -1.0,
    z: -7.0,
    verses: "53–71",
    firstVerse: 53,
    pin: 3.0,
    pad: 1.5,
    blurbSi: "බුදුරදුන් මැණික් පළඟ මත වැඩ හිඳ දහම් දෙසූ තැන ඉදිකළ මහ දාගැබ සහ පූජනීය විහාර මන්දිර.",
    blurbEn: "The sacred city and temple complex hallowed by the Buddha's visit, gleaming with stupas and lamps.",
  },
  {
    id: "devale",
    si: "විභීෂණ දේවාලය",
    en: "Vibhishana's shrine",
    x: 0.9,
    z: -6.2,
    verses: "72–111",
    firstVerse: 72,
    pin: 2.4,
    pad: 0.9,
    blurbSi: "උලකුඩය දේවියට පුත් රුවනක් අයැද සැළලිහිණිය සිය හසුන පිරිනමන විභීෂණ දෙව් මැඳුර.",
    blurbEn: "The grand shrine of Lord Vibhishana where temple dancers perform and the starling delivers the royal prayer.",
  },
];

export const SCENERY_LABELS = [
  { id: "colombo", si: "කොළඹ", en: "Colombo", x: -8.2, z: -2.4, y: 1.4 },
  { id: "estuary", si: "කැලණි මෝය", en: "Kelani estuary", x: -9.5, z: -9.6, y: 0.9 },
];

export const ROUTE_NODES: [number, number][] = [
  [-0.9, 4.3],
  [-0.5, 2.7],
  [-0.8, 1.3],
  [-1.5, -0.4],
  [-1.5, -1.7],
  [-1.1, -2.9],
  [-1.0, -4.2],
  [-1.2, -5.0],
  [-2.4, -7.1],
  [-1.0, -5.8],
  [0.9, -6.0],
];

export const VERSE_ANCHORS: [number, number][] = [
  [1, 0],
  [16, 0],
  [21, 0.7],
  [22, 2],
  [24, 2],
  [25, 3],
  [29, 4],
  [41, 6],
  [42, 6],
  [43, 7],
  [52, 8],
  [53, 9],
  [71, 9],
  [72, 10],
  [111, 10],
];

function hash2(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(x: number, z: number): number {
  let val = 0;
  let amp = 0.5;
  let freq = 0.14;
  for (let i = 0; i < 4; i++) {
    val += amp * valueNoise(x * freq, z * freq);
    freq *= 2.05;
    amp *= 0.5;
  }
  return val;
}

let cachedRiverCurve: THREE.CatmullRomCurve3 | null = null;
export function getRiverCurve(): THREE.CatmullRomCurve3 {
  if (!cachedRiverCurve) {
    cachedRiverCurve = new THREE.CatmullRomCurve3(
      RIVER_CONTROL_POINTS.map(([x, z]) => new THREE.Vector3(x, 0.02, z)),
      false,
      "centripetal"
    );
  }
  return cachedRiverCurve;
}

export function sampleTerrainHeight(x: number, z: number): number {
  const cX = coastX(z);
  const shoreDist = x - cX;
  if (shoreDist < -0.6) {
    return Math.max(-1.8, shoreDist * 0.25);
  }

  // Base coastal plain + gentle inland rise
  let h = 0.18 + Math.max(0, shoreDist) * 0.025 + fbm(x + 15, z + 15) * 0.65;

  // Smooth transition at beach
  if (shoreDist < 1.2) {
    const t = Math.max(0, (shoreDist + 0.6) / 1.8);
    h = THREE.MathUtils.lerp(-0.15, h, t * t * (3 - 2 * t));
  }

  // Diyawanna lake ring around Kotte (0, 5), with north causeway
  const dxK = x - 0;
  const dzK = z - 5;
  const rK = Math.hypot(dxK, dzK);
  const isNorthCauseway = dzK < -1.2 && Math.abs(dxK + 0.6) < 0.75;
  if (rK > 1.8 && rK < 3.1 && !isNorthCauseway) {
    const ringFactor = 1 - Math.abs(rK - 2.45) / 0.65;
    h -= Math.max(0, ringFactor) * 0.55;
  }

  // Kelani river carving
  const river = getRiverCurve();
  const samples = 48;
  let minDist = 999;
  for (let i = 0; i <= samples; i++) {
    const pt = river.getPoint(i / samples);
    const d = Math.hypot(x - pt.x, z - pt.z);
    if (d < minDist) minDist = d;
  }
  const riverHalfWidth = x < -4 ? 0.85 : 0.55;
  if (minDist < riverHalfWidth * 1.6) {
    const k = 1 - minDist / (riverHalfWidth * 1.6);
    h -= k * k * 0.68;
  }

  // Adam's Peak (Samanalakanda) at (29, 6) + eastern ridge near (25, 1)
  const dPeak = Math.hypot(x - 29, z - 6);
  h += 7.2 * Math.exp(-(dPeak * dPeak) / 18);

  const dRidge = Math.hypot((x - 25) * 0.8, (z - 1) * 0.5);
  h += 3.8 * Math.exp(-(dRidge * dRidge) / 28);

  // Level pads for landmarks
  for (const lm of LANDMARKS) {
    if (lm.pad > 0) {
      const d = Math.hypot(x - lm.x, z - lm.z);
      if (d < lm.pad * 1.4) {
        const blend = Math.max(0, Math.min(1, (lm.pad * 1.4 - d) / (lm.pad * 0.6)));
        h = THREE.MathUtils.lerp(h, 0.28, blend);
      }
    }
  }

  return h;
}

let cachedRouteCurve: THREE.CatmullRomCurve3 | null = null;
export function getRouteCurve(): THREE.CatmullRomCurve3 {
  if (!cachedRouteCurve) {
    cachedRouteCurve = new THREE.CatmullRomCurve3(
      ROUTE_NODES.map(([x, z]) => {
        const th = sampleTerrainHeight(x, z);
        const y = Math.max(th, 0.2) + 1.7;
        return new THREE.Vector3(x, y, z);
      }),
      false,
      "centripetal"
    );
  }
  return cachedRouteCurve;
}

export function verseToRouteFraction(verse: number): number {
  const v = Math.max(1, Math.min(111, verse));
  for (let i = 0; i < VERSE_ANCHORS.length - 1; i++) {
    const [v0, n0] = VERSE_ANCHORS[i];
    const [v1, n1] = VERSE_ANCHORS[i + 1];
    if (v >= v0 && v <= v1) {
      const t = v1 === v0 ? 0 : (v - v0) / (v1 - v0);
      const nodeIndex = n0 + t * (n1 - n0);
      return nodeIndex / (ROUTE_NODES.length - 1);
    }
  }
  return 1;
}
