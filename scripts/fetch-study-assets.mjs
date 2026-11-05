import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const origin = "https://sprachlabor-duo-2028.ps-kolesnikova.chatgpt.site";
const assets = [
  "public/audio/a1-a.mp3",
  "public/audio/a1-b.mp3",
  "public/audio/a1-p.mp3",
  "public/audio/a2-a.mp3",
  "public/audio/a2-b.mp3",
  "public/audio/a2-p.mp3",
  "public/audio/b1-a.mp3",
  "public/audio/b1-b.mp3",
  "public/audio/b1-p.mp3",
  "public/audio/b2-a.mp3",
  "public/audio/b2-b.mp3",
  "public/audio/b2-p.mp3",
  "public/audio/c1-a.mp3",
  "public/audio/c1-b.mp3",
  "public/audio/c1-p.mp3",
  "public/audio/d0.mp3",
  "public/audio/w01.mp3",
  "public/audio/w01_1.mp3",
  "public/audio/w01_2.mp3",
  "public/audio/w01_3.mp3",
  "public/audio/w01_4.mp3",
  "public/audio/w02.mp3",
  "public/audio/w02_1.mp3",
  "public/audio/w02_2.mp3",
  "public/audio/w02_3.mp3",
  "public/audio/w02_4.mp3",
  "public/audio/w03.mp3",
  "public/audio/w03_1.mp3",
  "public/audio/w03_2.mp3",
  "public/audio/w03_3.mp3",
  "public/audio/w04.mp3",
  "public/mascots/alfie.png",
  "public/mascots/spaniel.webp",
  "public/materialien/COERLL_Kurspaket_01.pdf",
  "public/materialien/tracker.xlsx"
];
for (const file of assets) {
  const response = await fetch(origin + "/" + file.slice(7));
  if (!response.ok) throw new Error(file + ": HTTP " + response.status);
  const content = await response.arrayBuffer();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(content));
  console.log(file);
}
