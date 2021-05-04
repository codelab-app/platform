alter table "public"."atom" alter column "atom_type_id" drop not null;
alter table "public"."atom" add column "atom_type_id" text;
