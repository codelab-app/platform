
alter table "public"."hoc" drop constraint "hoc_library_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."hoc" add column "library_id" uuid
 not null;

alter table "public"."category" drop constraint "category_library_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."category" add column "library_id" uuid
 not null;

alter table "public"."tag" drop constraint "tag_library_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."tag" add column "library_id" uuid
 not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."tag_library";

alter table "public"."page" alter column "user_id" drop not null;
alter table "public"."page" add column "user_id" text;

alter table "public"."page"
  add constraint "pages_owner_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete cascade;

DROP TABLE "public"."hoc_component_element";

DROP TABLE "public"."tag_hoc";

DROP TABLE "public"."hoc";

DROP TABLE "public"."tag_atom";

alter table "public"."component_element" drop constraint "component_element_props_c_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."component_element" add column "props_c_id" uuid
 null;

DROP TABLE "public"."tag_component";

alter table "public"."atom" drop constraint "atom_prop_type_c_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."atom" add column "prop_type_c_id" uuid
 null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."attribute";

DROP TABLE "public"."style_component_element";

DROP TABLE "public"."style_atom";

DROP TABLE "public"."style_page_element";

DROP TABLE "public"."tag_style";

alter table "public"."style" drop constraint "style_prop_c_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."style" add column "prop_c_id" uuid
 null;

alter table "public"."page_element" drop constraint "page_element_prop_c_id_fkey",
  add constraint "page_element_prop_c_id_fkey"
  foreign key ("prop_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete cascade;

alter table "public"."page_element" drop constraint "page_element_prop_c_id_fkey";

alter table "public"."page_element" rename column "prop_c_id" to "props_c_id";

alter table "public"."page_element" rename column "props_c_id" to "props";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."page_element" add column "props" uuid
 null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."prop_element";

DROP TABLE "public"."tag_library";

DROP TABLE "public"."tag_prop_type_c";

DROP TABLE "public"."tag_prop_c";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."category" add column "name" text
 null;

alter table "public"."prop_c" drop constraint "prop_c_libary_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."prop_c" add column "libary_id" uuid
 not null;

alter table "public"."tag_prop_value" rename to "prop_value_tag";

alter table "public"."prop" drop constraint "prop_prop_c_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."prop" add column "prop_c_id" uuid
 not null;

comment on column "public"."prop_value"."value_prop_id" is E'This is the prop that is used as a value';
alter table "public"."prop_value" alter column "value_prop_id" drop not null;
alter table "public"."prop_value" add column "value_prop_id" uuid;

comment on column "public"."prop_value"."lambda_id" is E'This is used as a value';
alter table "public"."prop_value"
  add constraint "prop_values_lambda_id_fkey"
  foreign key (lambda_id)
  references "public"."lambda"
  (id) on update restrict on delete set null;
alter table "public"."prop_value" alter column "lambda_id" drop not null;
alter table "public"."prop_value" add column "lambda_id" uuid;

alter table "public"."prop_value" alter column "name" drop not null;
alter table "public"."prop_value" add column "name" text;

alter table "public"."prop" drop constraint "prop_prop_type_id_fkey";

alter table "public"."prop_type" drop constraint "prop_type_key_prop_type_c_id_key";

alter table "public"."prop_type" drop constraint "prop_type_prop_type_c_id_fkey";

DROP TABLE "public"."prop_type_c";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."prop_type" add column "prop_type_c_id" uuid
 not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."prop" add column "prop_type_id" uuid
 null;

DROP TABLE "public"."prop_type";

alter table "public"."value_type" rename to "prop_value_type";

alter table "public"."prop"
  add constraint "prop_attribute_id_fkey"
  foreign key (attribute_id)
  references "public"."attribute"
  (id) on update restrict on delete cascade;
alter table "public"."prop" alter column "attribute_id" drop not null;
alter table "public"."prop" add column "attribute_id" uuid;

alter table "public"."prop"
  add constraint "props_library_id_fkey"
  foreign key (library_id)
  references "public"."library"
  (id) on update restrict on delete cascade;
alter table "public"."prop" alter column "library_id" drop not null;
alter table "public"."prop" add column "library_id" uuid;

DROP TABLE "public"."prop_c";
