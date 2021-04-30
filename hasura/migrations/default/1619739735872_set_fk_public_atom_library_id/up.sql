alter table "public"."atom"
  add constraint "atom_library_id_fkey"
  foreign key ("library_id")
  references "public"."library"
  ("id") on update cascade on delete cascade;
