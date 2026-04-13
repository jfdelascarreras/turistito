-- Tours: user-generated image tours with AI content and ElevenLabs audio (paths in Storage).
-- Private buckets: tour-images, tour-audio — RLS limits access to the owning user.

-- ---------------------------------------------------------------------------
-- Enum: tour status
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'tour_status') then
    create type public.tour_status as enum ('processing', 'complete');
  end if;
end$$;

-- ---------------------------------------------------------------------------
-- Table: public.tours
-- ---------------------------------------------------------------------------
create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  image text not null,
  title text not null,
  content text,
  audio text,
  status public.tour_status not null default 'processing',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tours_user_id_created_at_idx
  on public.tours (user_id, created_at desc);

comment on table public.tours is 'User tours: image path in Storage, AI text, optional audio path (ElevenLabs).';
comment on column public.tours.image is 'Storage object path inside tour-images bucket (e.g. {user_id}/file.jpg).';
comment on column public.tours.audio is 'Storage object path inside tour-audio bucket (e.g. {user_id}/file.mp3).';

alter table public.tours enable row level security;

drop policy if exists tours_select_own on public.tours;
create policy tours_select_own
on public.tours
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists tours_insert_own on public.tours;
create policy tours_insert_own
on public.tours
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists tours_update_own on public.tours;
create policy tours_update_own
on public.tours
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists tours_delete_own on public.tours;
create policy tours_delete_own
on public.tours
for delete
to authenticated
using (auth.uid() = user_id);

drop trigger if exists set_tours_updated_at on public.tours;
create trigger set_tours_updated_at
before update on public.tours
for each row execute procedure public.set_current_timestamp_updated_at();

-- ---------------------------------------------------------------------------
-- Storage buckets (private)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tour-images',
  'tour-images',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tour-audio',
  'tour-audio',
  false,
  26214400,
  array['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/webm', 'audio/ogg']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Path convention: {user_id}/{filename}
-- ---------------------------------------------------------------------------
-- Storage RLS: tour-images
-- ---------------------------------------------------------------------------
drop policy if exists tour_images_select_own on storage.objects;
create policy tour_images_select_own
on storage.objects
for select
to authenticated
using (
  bucket_id = 'tour-images'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_images_insert_own on storage.objects;
create policy tour_images_insert_own
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'tour-images'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_images_update_own on storage.objects;
create policy tour_images_update_own
on storage.objects
for update
to authenticated
using (
  bucket_id = 'tour-images'
  and split_part(name, '/', 1) = auth.uid()::text
)
with check (
  bucket_id = 'tour-images'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_images_delete_own on storage.objects;
create policy tour_images_delete_own
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'tour-images'
  and split_part(name, '/', 1) = auth.uid()::text
);

-- ---------------------------------------------------------------------------
-- Storage RLS: tour-audio
-- ---------------------------------------------------------------------------
drop policy if exists tour_audio_select_own on storage.objects;
create policy tour_audio_select_own
on storage.objects
for select
to authenticated
using (
  bucket_id = 'tour-audio'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_audio_insert_own on storage.objects;
create policy tour_audio_insert_own
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'tour-audio'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_audio_update_own on storage.objects;
create policy tour_audio_update_own
on storage.objects
for update
to authenticated
using (
  bucket_id = 'tour-audio'
  and split_part(name, '/', 1) = auth.uid()::text
)
with check (
  bucket_id = 'tour-audio'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists tour_audio_delete_own on storage.objects;
create policy tour_audio_delete_own
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'tour-audio'
  and split_part(name, '/', 1) = auth.uid()::text
);
