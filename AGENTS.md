## Next.js App Router & Vercel Build Guidelines
Always await `params` and `searchParams` in page and metadata functions. Ensure every build, lint, and typecheck passes
cleanly so GitHub Actions CI and Vercel deployments succeed without errors.
