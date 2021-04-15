alter table "public"."page_link"
  add constraint "page_link_target_component_element_id_fkey"
  foreign key ("target_component_element_id")
  references "public"."component_element"
  ("id") on update restrict on delete cascade;
