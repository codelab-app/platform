alter table "public"."atom"
  add constraint "vertices_component_id_fkey"
  foreign key ("component_element_id")
  references "public"."component"
  ("id") on update restrict on delete cascade;
