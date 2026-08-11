# Wardrobe

Single-project web app. No monorepo, no mobile scaffolding. Wardrobe grid by
category + a wishlist that syncs across every device you open it on
(phone, laptop), because the data lives in Supabase instead of your browser.

## 1. Create the Supabase project

1. Go to supabase.com → sign up free → New project.
2. Once it's created, open the SQL Editor (left sidebar) → New query.
3. Paste in everything from `supabase-setup.sql` in this folder → Run.
4. Go to Project Settings → API. Copy the **Project URL** and the
   **anon public** key.

## 2. Connect the app locally

Create a file called `.env` in this folder (copy `.env.example`):

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then:

```
npm install
npm run dev
```

Open the local URL it prints. Add an item, refresh, it should still be there.

## 3. Deploy to Vercel

1. Push this folder to a new GitHub repo (a clean one, not
   Wardrobe-Matrix-v2, start fresh so there's no leftover monorepo config).
2. On vercel.com, import that repo. Framework preset: Vite.
3. In the Vercel project's Settings → Environment Variables, add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the same values
   as your `.env`.
4. Deploy. Open the link on your phone, add it to your home screen.

Now checking something off on your phone shows up on your laptop too,
next refresh.

## Notes

- No login system. Anyone with your deployed URL could edit the data. Fine
  for a personal link you don't share, but don't post the URL publicly.
- Wishlist items move into the wardrobe automatically when you tick them
  as bought.
