alter table "public"."component_element"
  add constraint "component_elements_atom_id_fkey"
  foreign key ("atom_id")
  references "public"."atom"
  ("id") on update restrict on delete cascade;
