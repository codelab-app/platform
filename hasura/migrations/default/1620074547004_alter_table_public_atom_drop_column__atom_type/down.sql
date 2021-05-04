alter table "public"."atom"
  add constraint "atom__type_fkey"
  foreign key (_atom_type)
  references "public"."atom_type"
  (value) on update restrict on delete restrict;
alter table "public"."atom" alter column "_atom_type" drop not null;
alter table "public"."atom" add column "_atom_type" text;
