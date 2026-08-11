# Wardrobe Matrix

Outfit builder (static clothing catalog, no backend) + a wishlist that syncs
across every device you open it on, because the wishlist data lives in
Supabase instead of your browser.

**What's actually live:** `index.html`, served directly by GitHub Pages.
It's a single self-contained file, vanilla JS, no build step. The outfit
builder uses a hardcoded catalog baked into the file. Only the wishlist talks
to Supabase.

## Wishlist setup

1. Go to supabase.com → sign up free → New project.
2. Open the SQL Editor (left sidebar) → New query.
3. Paste in everything from `supabase-setup.sql` in this repo → Run.
4. Go to Project Settings → API. Copy the **Project URL** and the
   **anon public** key.
5. Open `index.html`, find `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the
   bottom of the script, paste your values in.
6. Commit and push. GitHub Pages serves the file as-is, nothing to build.

## Notes

- No login system, and the Supabase keys are hardcoded in `index.html`
  itself, not an env var. Anyone who finds this repo or your deployed URL
  can read/edit/delete wishlist data (RLS policies allow public access).
  Don't post the URL publicly, and rotate the anon key if it's ever leaked.
- Checking a wishlist item off marks it bought and moves it to the bottom
  of the list, struck through. It stays visible, it doesn't disappear.

## `src/` folder (not deployed)

There's a separate React + Vite + Supabase rewrite in `src/` (`npm install`,
`npm run dev`). It's not wired up to `index.html` and isn't what's live on
GitHub Pages. Treat it as a work-in-progress rebuild, not the current app.
