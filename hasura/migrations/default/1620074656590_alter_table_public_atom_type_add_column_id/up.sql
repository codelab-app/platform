CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."atom_type" add column "id" uuid
 not null unique default gen_random_uuid();
