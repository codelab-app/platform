alter table "public"."component_element" alter column "atom_id" drop not null;
alter table "public"."component_element" add column "atom_id" uuid;
