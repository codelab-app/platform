alter table "public"."attribute"
  add constraint "attribute_value_type_fkey"
  foreign key ("value_type")
  references "public"."prop_value_type"
  ("value") on update restrict on delete set null;
