-- Row-Level Security policies. Run after 0001_init.sql.
-- Role hierarchy: admin > faculty > researcher > student > visitor
-- (matches the profiles.role check constraint).

alter table plants enable row level security;
alter table compounds enable row level security;
alter table targets enable row level security;
alter table diseases enable row level security;
alter table disease_targets enable row level security;
alter table compound_targets enable row level security;
alter table research_papers enable row level security;
alter table paper_evidence enable row level security;
alter table profiles enable row level security;

-- Helper: current user's role, or 'visitor' if not logged in.
create function public.current_role()
returns text as $$
  select coalesce(
    (select role from profiles where id = auth.uid()),
    'visitor'
  );
$$ language sql stable;

-- Profiles: everyone can read their own row; admins can read all.
create policy "read own profile" on profiles
  for select using (auth.uid() = id or public.current_role() = 'admin');

create policy "admin manages roles" on profiles
  for update using (public.current_role() = 'admin');

-- Plants: published rows are public. Unpublished rows are visible to
-- their creator and to researcher/faculty/admin. Only researcher+ can
-- write; only faculty/admin can flip published = true.
create policy "read published plants" on plants
  for select using (
    published = true
    or created_by = auth.uid()
    or public.current_role() in ('researcher','faculty','admin')
  );

create policy "researcher+ can insert plants" on plants
  for insert with check (
    public.current_role() in ('researcher','faculty','admin')
  );

create policy "researcher+ can update own or faculty can update any" on plants
  for update using (
    (created_by = auth.uid() and public.current_role() in ('researcher','faculty','admin'))
    or public.current_role() in ('faculty','admin')
  );

-- Compounds, targets, diseases, papers follow the same shape: public
-- read, researcher+ write. (Targets/diseases have no draft/publish
-- distinction — they're reference vocabulary, not editorial content.)
create policy "public read compounds" on compounds for select using (true);
create policy "researcher+ write compounds" on compounds
  for insert with check (public.current_role() in ('researcher','faculty','admin'));
create policy "researcher+ update own compounds" on compounds
  for update using (
    created_by = auth.uid() or public.current_role() in ('faculty','admin')
  );

create policy "public read targets" on targets for select using (true);
create policy "researcher+ write targets" on targets
  for insert with check (public.current_role() in ('researcher','faculty','admin'));

create policy "public read diseases" on diseases for select using (true);
create policy "researcher+ write diseases" on diseases
  for insert with check (public.current_role() in ('researcher','faculty','admin'));

create policy "public read disease_targets" on disease_targets for select using (true);
create policy "researcher+ write disease_targets" on disease_targets
  for insert with check (public.current_role() in ('researcher','faculty','admin'));

create policy "public read compound_targets" on compound_targets for select using (true);
create policy "researcher+ write compound_targets" on compound_targets
  for insert with check (public.current_role() in ('researcher','faculty','admin'));

create policy "public read research_papers" on research_papers for select using (true);
create policy "researcher+ write research_papers" on research_papers
  for insert with check (public.current_role() in ('researcher','faculty','admin'));

create policy "public read paper_evidence" on paper_evidence for select using (true);
create policy "researcher+ write paper_evidence" on paper_evidence
  for insert with check (public.current_role() in ('researcher','faculty','admin'));
