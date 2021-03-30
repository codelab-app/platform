alter table "public"."prop"
  add constraint "prop_attribute_id_fkey"
  foreign key ("attribute_id")
  references "public"."attribute"
  ("id") on update restrict on delete cascade;
