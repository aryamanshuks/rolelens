# RoleLens
Evidence-first career gap analysis. Paste a target job description and candidate background to receive exactly three prioritized evidence gaps and a 7-day action plan.

## Stack
Next.js on Vercel, Gemini API, Supabase Postgres.

## Safety
User content is treated as data, not instructions. The prompt prohibits protected-trait inference and hiring guarantees. Inputs are length-capped; the endpoint applies an hourly request cap; secrets remain server-side.

## Environment variables
GEMINI_API_KEY, GEMINI_MODEL, SUPABASE_URL, SUPABASE_SECRET_KEY.
