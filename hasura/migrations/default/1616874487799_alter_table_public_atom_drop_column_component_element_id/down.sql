alter table "public"."atom" alter column "component_element_id" drop not null;
alter table "public"."atom" add column "component_element_id" uuid;
