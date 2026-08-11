-- Run this in Supabase Dashboard -> SQL Editor -> New query

create table items (
  id uuid primary key default gen_random_uuid(),
  category_id text not null,
  name text not null,
  color_hex text not null,
  price text,
  link text,
  is_wishlist boolean not null default false,
  bought boolean not null default false,
  created_at timestamptz not null default now()
);

-- Since this is a personal single-user app with no login, allow the
-- public anon key to read/write. Do not share your site URL publicly
-- if you don't want strangers editing your wardrobe.
alter table items enable row level security;

create policy "public read" on items for select using (true);
create policy "public insert" on items for insert with check (true);
create policy "public update" on items for update using (true);
create policy "public delete" on items for delete using (true);
