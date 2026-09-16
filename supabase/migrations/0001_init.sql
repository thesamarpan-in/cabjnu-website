-- Centre for Ayurveda Biology, JNU — core research schema
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- on a fresh project, before 0002_rls.sql.

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ---------------------------------------------------------------------
-- Profiles: mirrors auth.users, adds the role used by RLS policies.
-- A row is created automatically for every new signup (trigger below).
-- ---------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'visitor'
    check (role in ('admin','faculty','researcher','student','visitor')),
  created_at timestamptz default now()
);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'visitor');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------
-- Plants — the atlas's core table.
-- ---------------------------------------------------------------------
create table plants (
  plant_id uuid primary key default gen_random_uuid(),
  scientific_name text not null,
  common_name text,
  sanskrit_name text,
  family text,
  botanical_description text,
  rasa text,
  guna text,
  virya text,
  vipaka text,
  dosha_effect text,
  latitude double precision,
  longitude double precision,
  qr_slug text unique,                 -- e.g. 'ashwagandha' -> /atlas/ashwagandha
  published boolean not null default false,
  verified_by uuid references profiles(id),
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Compounds isolated from (or associated with) a plant.
-- ---------------------------------------------------------------------
create table compounds (
  compound_id uuid primary key default gen_random_uuid(),
  name text not null,
  pubchem_cid text,                    -- link out to PubChem; don't store structures locally
  source_plant_id uuid references plants(plant_id) on delete set null,
  biological_activity text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Molecular targets / pathways.
-- ---------------------------------------------------------------------
create table targets (
  target_id uuid primary key default gen_random_uuid(),
  name text not null,
  uniprot_id text,
  pathway text,
  kegg_id text,
  created_at timestamptz default now()
);

-- Which compound acts on which target, and how strong the evidence is.
create table compound_targets (
  compound_id uuid references compounds(compound_id) on delete cascade,
  target_id uuid references targets(target_id) on delete cascade,
  evidence_status text not null default 'hypothesized'
    check (evidence_status in
      ('experimentally_demonstrated','proposed','hypothesized','not_established')),
  primary key (compound_id, target_id)
);

-- ---------------------------------------------------------------------
-- Diseases.
-- ---------------------------------------------------------------------
create table diseases (
  disease_id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table disease_targets (
  disease_id uuid references diseases(disease_id) on delete cascade,
  target_id uuid references targets(target_id) on delete cascade,
  primary key (disease_id, target_id)
);

-- ---------------------------------------------------------------------
-- Research papers — the evidence backbone. Every non-obvious claim in
-- the atlas or knowledge graph should trace back to a row here.
-- ---------------------------------------------------------------------
create table research_papers (
  paper_id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text,
  journal text,
  year int,
  doi text,
  pubmed_id text,
  evidence_status text not null default 'hypothesized'
    check (evidence_status in
      ('experimentally_demonstrated','proposed','hypothesized','not_established')),
  added_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Junction: which paper supports which compound-target claim.
create table paper_evidence (
  paper_id uuid references research_papers(paper_id) on delete cascade,
  compound_id uuid references compounds(compound_id) on delete cascade,
  target_id uuid references targets(target_id) on delete cascade,
  primary key (paper_id, compound_id, target_id)
);

-- ---------------------------------------------------------------------
-- Indexes for the lookups the atlas and search will actually do.
-- ---------------------------------------------------------------------
create index idx_plants_qr_slug on plants(qr_slug);
create index idx_plants_published on plants(published);
create index idx_compounds_source_plant on compounds(source_plant_id);
create index idx_papers_pubmed_id on research_papers(pubmed_id);
