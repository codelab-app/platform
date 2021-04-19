
CREATE TABLE "public"."prop_c" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" Text, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."prop" drop column "library_id" cascade;

alter table "public"."prop" drop column "attribute_id" cascade;

alter table "public"."prop_value_type" rename to "value_type";

CREATE TABLE "public"."prop_type" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "key" text, "value_type" text, PRIMARY KEY ("id") , FOREIGN KEY ("value_type") REFERENCES "public"."value_type"("value") ON UPDATE restrict ON DELETE set null);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."prop" add column "prop_type_id" uuid
 null;

alter table "public"."prop_type" add column "prop_type_c_id" uuid
 not null;

CREATE TABLE "public"."prop_type_c" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "label" text, "library_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("library_id") REFERENCES "public"."library"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."prop_type"
  add constraint "prop_type_prop_type_c_id_fkey"
  foreign key ("prop_type_c_id")
  references "public"."prop_type_c"
  ("id") on update restrict on delete cascade;

alter table "public"."prop_type" add constraint "prop_type_key_prop_type_c_id_key" unique ("key", "prop_type_c_id");

alter table "public"."prop"
  add constraint "prop_prop_type_id_fkey"
  foreign key ("prop_type_id")
  references "public"."prop_type"
  ("id") on update restrict on delete cascade;

alter table "public"."prop_value" drop column "name" cascade;

alter table "public"."prop_value" drop column "lambda_id" cascade;

alter table "public"."prop_value" drop column "value_prop_id" cascade;

alter table "public"."prop" add column "prop_c_id" uuid
 not null;

alter table "public"."prop"
  add constraint "prop_prop_c_id_fkey"
  foreign key ("prop_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete cascade;

alter table "public"."prop_value_tag" rename to "tag_prop_value";

alter table "public"."prop_c" add column "libary_id" uuid
 not null;

alter table "public"."prop_c"
  add constraint "prop_c_libary_id_fkey"
  foreign key ("libary_id")
  references "public"."library"
  ("id") on update restrict on delete cascade;

alter table "public"."category" add column "name" text
 null;

CREATE TABLE "public"."tag_prop_c" ("tag_id" uuid NOT NULL, "prop_c_id" uuid NOT NULL, PRIMARY KEY ("tag_id","prop_c_id") , FOREIGN KEY ("prop_c_id") REFERENCES "public"."prop_c"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."tag_prop_type_c" ("prop_type_c_id" uuid NOT NULL, "tag_id" uuid NOT NULL, PRIMARY KEY ("prop_type_c_id","tag_id") , FOREIGN KEY ("prop_type_c_id") REFERENCES "public"."prop_type_c"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."tag_library" ("library_id" uuid NOT NULL, "tag_id" uuid NOT NULL, PRIMARY KEY ("library_id","tag_id") , FOREIGN KEY ("library_id") REFERENCES "public"."library"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade);

DROP table "public"."prop_element";

alter table "public"."page_element" add column "props" uuid
 null;

alter table "public"."page_element" rename column "props" to "props_c_id";

alter table "public"."page_element" rename column "props_c_id" to "prop_c_id";

alter table "public"."page_element"
  add constraint "page_element_prop_c_id_fkey"
  foreign key ("prop_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete cascade;

alter table "public"."page_element" drop constraint "page_element_prop_c_id_fkey",
  add constraint "page_element_prop_c_id_fkey"
  foreign key ("prop_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete set null;

alter table "public"."style" add column "prop_c_id" uuid
 null;

alter table "public"."style"
  add constraint "style_prop_c_id_fkey"
  foreign key ("prop_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete set null;

CREATE TABLE "public"."tag_style" ("tag_id" uuid NOT NULL, "style_id" uuid NOT NULL, PRIMARY KEY ("tag_id","style_id") , FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."style_page_element" ("style_id" uuid NOT NULL, "page_element_id" uuid NOT NULL, PRIMARY KEY ("style_id","page_element_id") , FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("page_element_id") REFERENCES "public"."page_element"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."style_atom" ("atom_id" uuid NOT NULL, "style_id" uuid NOT NULL, PRIMARY KEY ("atom_id","style_id") , FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("atom_id") REFERENCES "public"."atom"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."style_component_element" ("component_element_id" uuid NOT NULL, "style_id" uuid NOT NULL, PRIMARY KEY ("component_element_id","style_id") , FOREIGN KEY ("style_id") REFERENCES "public"."style"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("component_element_id") REFERENCES "public"."component_element"("id") ON UPDATE restrict ON DELETE cascade);

DROP table "public"."attribute";

alter table "public"."atom" add column "prop_type_c_id" uuid
 null;

alter table "public"."atom"
  add constraint "atom_prop_type_c_id_fkey"
  foreign key ("prop_type_c_id")
  references "public"."prop_type_c"
  ("id") on update restrict on delete cascade;

CREATE TABLE "public"."tag_component" ("tag_id" uuid NOT NULL, "component_id" uuid NOT NULL, PRIMARY KEY ("tag_id","component_id") , FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("component_id") REFERENCES "public"."component"("id") ON UPDATE restrict ON DELETE cascade);

alter table "public"."component_element" add column "props_c_id" uuid
 null;

alter table "public"."component_element"
  add constraint "component_element_props_c_id_fkey"
  foreign key ("props_c_id")
  references "public"."prop_c"
  ("id") on update restrict on delete set null;

CREATE TABLE "public"."tag_atom" ("tag_id" uuid NOT NULL, "atom_id" uuid NOT NULL, PRIMARY KEY ("tag_id","atom_id") , FOREIGN KEY ("atom_id") REFERENCES "public"."atom"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."hoc" ("id" uuid NOT NULL, PRIMARY KEY ("id") );

CREATE TABLE "public"."tag_hoc" ("tag_id" uuid NOT NULL, "hoc_id" uuid NOT NULL, PRIMARY KEY ("tag_id","hoc_id") , FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("hoc_id") REFERENCES "public"."hoc"("id") ON UPDATE restrict ON DELETE cascade);

CREATE TABLE "public"."hoc_component_element" ("component_element_id" uuid NOT NULL, "hoc_id" uuid NOT NULL, PRIMARY KEY ("component_element_id","hoc_id") , FOREIGN KEY ("hoc_id") REFERENCES "public"."hoc"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("component_element_id") REFERENCES "public"."component_element"("id") ON UPDATE restrict ON DELETE cascade);

alter table "public"."page" drop constraint "pages_owner_id_fkey";

alter table "public"."page" drop column "user_id" cascade;

DROP table "public"."tag_library";

alter table "public"."tag" add column "library_id" uuid
 not null;

alter table "public"."tag"
  add constraint "tag_library_id_fkey"
  foreign key ("library_id")
  references "public"."library"
  ("id") on update restrict on delete cascade;

alter table "public"."category" add column "library_id" uuid
 not null;

alter table "public"."category"
  add constraint "category_library_id_fkey"
  foreign key ("library_id")
  references "public"."library"
  ("id") on update restrict on delete cascade;

alter table "public"."hoc" add column "library_id" uuid
 not null;

alter table "public"."hoc"
  add constraint "hoc_library_id_fkey"
  foreign key ("library_id")
  references "public"."library"
  ("id") on update restrict on delete cascade;
