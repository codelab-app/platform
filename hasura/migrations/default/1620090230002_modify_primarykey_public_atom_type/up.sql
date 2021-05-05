alter table "public"."atom_type" drop constraint "vertexType_pkey";
alter table "public"."atom_type"
    add constraint "atom_type_pkey"
    primary key ("id");
