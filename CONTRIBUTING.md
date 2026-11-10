# Contributing to Salalihini Sandeshaya

**You don't need to write code to contribute!** Fixing a typo in a Sinhala verse, making an English explanation clearer for school students, or adding a helpful historical note is deeply appreciated.

## Fixing a verse explanation (no coding required)

1. Open `src/data/meanings-1.ts` (verses 1–28), `meanings-2.ts` (29–56), `meanings-3.ts` (57–84), or `meanings-4.ts` (85–111).
2. Read our [Content Style Guide](./docs/content-style-guide.md)—never copy copyrighted commentary; write in plain, student-friendly language.
3. Open a Pull Request or submit a **Content Correction** issue on GitHub.

## Development setup

1. Fork and clone the repository.
2. Use Node 22 (`nvm use`) and run `npm install`.
3. Run `npm run dev` to preview at `http://localhost:3000`.
4. Before opening a PR, verify that all three checks pass:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
