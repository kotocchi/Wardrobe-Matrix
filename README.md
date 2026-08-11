# Wardrobe Matrix

An interactive outfit builder and color balance checker built with vanilla HTML, CSS, and JavaScript. Plan your looks using Korean fashion styling principles, then generate a Leonardo AI prompt to visualize them. A Supabase-backed wishlist syncs across every device you open it on.

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://kotocchi.github.io/Wardrobe-Matrix/)

## ✨ Features

- **Mix and Match Selector** — choose from preset wardrobe pieces or add custom items for every category (inner top, outer layer, bottom, shoes, accessories)
- **Smart Color Balance Checker** — detects bold, dark, and earth tone colors and flags clashing combinations with specific feedback
- **Korean Fashion Concepts** — auto-labels outfits with relevant styling principles (Pointing Down, WI, Damin Look, etc.)
- **Leonardo AI Prompt Generator** — auto-generates a copyable prompt based on your selected outfit
- **Synced Wishlist** — add pieces you're eyeing, with price and link, synced across devices via Supabase; checking one off marks it bought and moves it to the bottom instead of hiding it

## 🚀 Quick Start

1. Open [kotocchi.github.io/Wardrobe-Matrix](https://kotocchi.github.io/Wardrobe-Matrix/) in any browser, no setup or dependencies needed
2. Select one piece per category, or type a custom piece in the Other field and hit **Use this**
3. Your outfit combo, concept label, and balance check appear instantly
4. Copy the Leonardo AI prompt to visualize the look

## 🎨 Color Balance Logic

The app categorizes every piece by scanning for color keywords:

| Category | Colors |
|----------|--------|
| **Bold** | red, blue, green, yellow, orange, purple, pink, teal, emerald, coral, mustard, etc. |
| **Dark** | black, charcoal, navy, deep |
| **Earth** | olive, brown, beige, sand, cream, tan, khaki, terracotta, rust, grey, white |

### Balance Rules

- **3+ bold pieces** → ⚠️ Flagged (too many loud colors)
- **2 bold + dark outer** → ✅ Pointing Down applied (balanced)
- **2 bold + no dark** → ⚠️ Flagged (needs grounding)
- **1 bold + dark outer** → ✅ Pointing Down working
- **1 bold + no dark** → ⚠️ Point accent on neutral base
- **All earth/dark/neutral** → ✅ Good to go

## 👗 Korean Fashion Concepts

| Concept | Description |
|---------|-------------|
| **Pointing Down** | Bold colors paired with dark tones for grounding |
| **WI (Wit)** | Subtle playful contrast — dark or unexpected pairing against earth tones |
| **Damin Look** | Minimalist Korean boyfriend aesthetic — basics only |

## 🛠️ Tech Stack

- **Frontend**: single-file HTML, CSS, and JavaScript, no frameworks or build step
- **Wishlist backend**: Supabase (Postgres + REST), synced across devices
- **Deployment**: GitHub Pages, serves `index.html` directly

## 📦 Wishlist Setup

The outfit builder needs nothing. The wishlist needs a free Supabase project:

1. Go to supabase.com → sign up free → New project.
2. Open the SQL Editor → New query → paste in everything from `supabase-setup.sql` in this repo → Run.
3. Go to Project Settings → API. Copy the **Project URL** and the **anon public** key.
4. Open `index.html`, find `SUPABASE_URL` and `SUPABASE_ANON_KEY` near the bottom of the script, paste your values in.
5. Commit and push. GitHub Pages serves the updated file automatically.

⚠️ No login system, and the Supabase keys live directly in `index.html`. Anyone who finds this repo or your deployed URL can read/edit/delete wishlist data. Don't post the URL publicly, and rotate the anon key if it's ever exposed somewhere you didn't intend.

## 💡 Background

Built as a personal wardrobe planning tool based on Korean fashion styling principles. Designed around an earth tone palette with grey New Balance sneakers as the foundation piece.

Perfect for:
- Planning outfits before building them IRL
- Generating AI references with Leonardo AI
- Learning Korean fashion styling concepts
- Quick color harmony checks

## 🔗 Links

- **Live Demo**: https://kotocchi.github.io/Wardrobe-Matrix/
- **Repository**: https://github.com/kotocchi/Wardrobe-Matrix

## 🧪 In Progress

There's a separate React + Vite + Supabase rewrite in `src/` (`npm install`, `npm run dev`). It's not wired up to `index.html` and isn't what's live on GitHub Pages yet, it's a work-in-progress rebuild with full wardrobe (not just wishlist) sync.
