alter table "public"."atom_type" alter column "description" drop not null;
alter table "public"."atom_type" add column "description" text;
