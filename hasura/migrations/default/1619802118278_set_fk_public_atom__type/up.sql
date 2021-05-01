alter table "public"."atom"
  add constraint "atom__type_fkey"
  foreign key ("_type")
  references "public"."atom_type"
  ("value") on update restrict on delete restrict;
