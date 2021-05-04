alter table "public"."prop_type" alter column "isArray" drop not null;
alter table "public"."prop_type" alter column "isArray" set default 'false';
