-- Create a public profiles table linked to auth.users.
-- Includes RLS + trigger to auto-create profile rows on signup.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text null,
  avatar_url text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- RLS policies: each user can read/update their own profile only.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Optional: keep updated_at current.
create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_current_timestamp_updated_at();

-- Create profile row whenever a new auth user is created.
-- Reads nombre/avatar_url from raw_user_meta_data if provided on signUp.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nombre, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'nombre',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set
    nombre = coalesce(excluded.nombre, public.profiles.nombre),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Backfill profiles for existing users (idempotent).
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

