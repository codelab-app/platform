alter table "public"."atom_type" drop constraint "atom_type_pkey";
alter table "public"."atom_type"
    add constraint "vertexType_pkey"
    primary key ("label");
