alter table "public"."atom"
  add constraint "vertices_type_fkey"
  foreign key ("type")
  references "public"."atom_type"
  ("value") on update restrict on delete restrict;
