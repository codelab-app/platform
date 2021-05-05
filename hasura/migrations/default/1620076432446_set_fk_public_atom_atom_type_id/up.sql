alter table "public"."atom"
  add constraint "atom_atom_type_id_fkey"
  foreign key ("atom_type_id")
  references "public"."atom_type"
  ("id") on update restrict on delete restrict;
