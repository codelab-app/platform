SET check_function_bodies = false;
CREATE TABLE public."user" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text
);
CREATE FUNCTION public.get_current_user(hasura_session json) RETURNS SETOF public."user"
    LANGUAGE sql STABLE
    AS $$
    SELECT *
    FROM "user"
    WHERE
      id = (hasura_session ->> 'x-hasura-user-id')::text
$$;
CREATE TABLE public.app (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.atom (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type text NOT NULL,
    prop_type_c_id uuid
);
CREATE TABLE public.atom_type (
    value text NOT NULL,
    description text
);
CREATE TABLE public.category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    library_id uuid NOT NULL
);
CREATE TABLE public.component (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    library_id uuid NOT NULL,
    label text NOT NULL
);
CREATE TABLE public.component_element (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    component_id uuid NOT NULL,
    atom_id uuid,
    props_c_id uuid
);
CREATE TABLE public.component_link (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    props jsonb,
    "order" integer,
    component_id uuid NOT NULL,
    source_element_id uuid NOT NULL,
    target_element_id uuid,
    category_id uuid
);
CREATE TABLE public.hoc (
    id uuid NOT NULL,
    library_id uuid NOT NULL
);
CREATE TABLE public.hoc_component_element (
    component_element_id uuid NOT NULL,
    hoc_id uuid NOT NULL
);
CREATE TABLE public.lambda (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    body text NOT NULL,
    library_id uuid NOT NULL
);
CREATE TABLE public.library (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    name text
);
CREATE TABLE public.page (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    app_id uuid NOT NULL
);
CREATE TABLE public.page_element (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    component_id uuid NOT NULL,
    page_id uuid NOT NULL,
    name text,
    prop_c_id uuid
);
CREATE TABLE public.page_link (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_id uuid NOT NULL,
    source_page_element_id uuid NOT NULL,
    target_page_element_id uuid NOT NULL,
    props jsonb,
    "order" integer,
    source_component_element_id uuid NOT NULL
);
CREATE TABLE public.prop (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    prop_type_id uuid NOT NULL,
    prop_c_id uuid NOT NULL
);
CREATE TABLE public.prop_c (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text,
    libary_id uuid NOT NULL
);
CREATE TABLE public.prop_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value_type text,
    prop_type_c_id uuid NOT NULL
);
CREATE TABLE public.prop_type_c (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text,
    library_id uuid NOT NULL
);
CREATE TABLE public.prop_value (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type text NOT NULL,
    prop_id uuid NOT NULL,
    value text
);
COMMENT ON COLUMN public.prop_value.prop_id IS 'This is the prop that owns this value';
CREATE TABLE public.style (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    library_id uuid NOT NULL,
    prop_c_id uuid
);
CREATE TABLE public.style_atom (
    atom_id uuid NOT NULL,
    style_id uuid NOT NULL
);
CREATE TABLE public.style_component_element (
    component_element_id uuid NOT NULL,
    style_id uuid NOT NULL
);
CREATE TABLE public.style_page_element (
    style_id uuid NOT NULL,
    page_element_id uuid NOT NULL
);
CREATE TABLE public.tag (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    category_id uuid,
    library_id uuid NOT NULL
);
CREATE TABLE public.tag_atom (
    tag_id uuid NOT NULL,
    atom_id uuid NOT NULL
);
CREATE TABLE public.tag_component (
    tag_id uuid NOT NULL,
    component_id uuid NOT NULL
);
CREATE TABLE public.tag_hoc (
    tag_id uuid NOT NULL,
    hoc_id uuid NOT NULL
);
CREATE TABLE public.tag_prop_c (
    tag_id uuid NOT NULL,
    prop_c_id uuid NOT NULL
);
CREATE TABLE public.tag_prop_type_c (
    prop_type_c_id uuid NOT NULL,
    tag_id uuid NOT NULL
);
CREATE TABLE public.tag_prop_value (
    prop_value_id uuid NOT NULL,
    tag_id uuid NOT NULL
);
CREATE TABLE public.tag_style (
    tag_id uuid NOT NULL,
    style_id uuid NOT NULL
);
CREATE TABLE public.value_type (
    value text NOT NULL,
    description text
);
ALTER TABLE ONLY public.app
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_elements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.component
    ADD CONSTRAINT components_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page_element
    ADD CONSTRAINT elements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.hoc_component_element
    ADD CONSTRAINT hoc_component_element_pkey PRIMARY KEY (component_element_id, hoc_id);
ALTER TABLE ONLY public.hoc
    ADD CONSTRAINT hoc_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lambda
    ADD CONSTRAINT lambdas_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.library
    ADD CONSTRAINT libraries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page_link
    ADD CONSTRAINT page_links_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop_c
    ADD CONSTRAINT prop_c_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop_type_c
    ADD CONSTRAINT prop_type_c_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop_type
    ADD CONSTRAINT prop_type_key_prop_type_c_id_key UNIQUE (key, prop_type_c_id);
ALTER TABLE ONLY public.prop_type
    ADD CONSTRAINT prop_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tag_prop_value
    ADD CONSTRAINT prop_value_tag_pkey PRIMARY KEY (prop_value_id, tag_id);
ALTER TABLE ONLY public.value_type
    ADD CONSTRAINT prop_value_types_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.prop_value
    ADD CONSTRAINT prop_values_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop
    ADD CONSTRAINT props_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.style_atom
    ADD CONSTRAINT style_atom_pkey PRIMARY KEY (atom_id, style_id);
ALTER TABLE ONLY public.style_component_element
    ADD CONSTRAINT style_component_element_pkey PRIMARY KEY (component_element_id, style_id);
ALTER TABLE ONLY public.style_page_element
    ADD CONSTRAINT style_page_element_pkey PRIMARY KEY (style_id, page_element_id);
ALTER TABLE ONLY public.style
    ADD CONSTRAINT styles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tag_atom
    ADD CONSTRAINT tag_atom_pkey PRIMARY KEY (tag_id, atom_id);
ALTER TABLE ONLY public.tag_component
    ADD CONSTRAINT tag_component_pkey PRIMARY KEY (tag_id, component_id);
ALTER TABLE ONLY public.tag_hoc
    ADD CONSTRAINT tag_hoc_pkey PRIMARY KEY (tag_id, hoc_id);
ALTER TABLE ONLY public.tag_prop_c
    ADD CONSTRAINT tag_prop_c_pkey PRIMARY KEY (tag_id, prop_c_id);
ALTER TABLE ONLY public.tag_prop_type_c
    ADD CONSTRAINT tag_prop_type_c_pkey PRIMARY KEY (prop_type_c_id, tag_id);
ALTER TABLE ONLY public.tag_style
    ADD CONSTRAINT tag_style_pkey PRIMARY KEY (tag_id, style_id);
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.atom_type
    ADD CONSTRAINT "vertexType_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT vertex_edge_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT vertices_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.app
    ADD CONSTRAINT apps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT atom_prop_type_c_id_fkey FOREIGN KEY (prop_type_c_id) REFERENCES public.prop_type_c(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_element_atom_id_fkey FOREIGN KEY (atom_id) REFERENCES public.atom(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_element_props_c_id_fkey FOREIGN KEY (props_c_id) REFERENCES public.prop_c(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_elements_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT component_links_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT component_links_source_element_id_fkey FOREIGN KEY (source_element_id) REFERENCES public.component_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT component_links_target_element_id_fkey FOREIGN KEY (target_element_id) REFERENCES public.component_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.component
    ADD CONSTRAINT "components_libraryId_fkey" FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_element
    ADD CONSTRAINT elements_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_element
    ADD CONSTRAINT elements_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.page(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.hoc_component_element
    ADD CONSTRAINT hoc_component_element_component_element_id_fkey FOREIGN KEY (component_element_id) REFERENCES public.component_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.hoc_component_element
    ADD CONSTRAINT hoc_component_element_hoc_id_fkey FOREIGN KEY (hoc_id) REFERENCES public.hoc(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.hoc
    ADD CONSTRAINT hoc_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.lambda
    ADD CONSTRAINT lambdas_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.library
    ADD CONSTRAINT libraries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_element
    ADD CONSTRAINT page_element_prop_c_id_fkey FOREIGN KEY (prop_c_id) REFERENCES public.prop_c(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.page_link
    ADD CONSTRAINT page_link_target_component_element_id_fkey FOREIGN KEY (source_component_element_id) REFERENCES public.component_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_link
    ADD CONSTRAINT page_links_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.page(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_link
    ADD CONSTRAINT page_links_source_element_id_fkey FOREIGN KEY (source_page_element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_link
    ADD CONSTRAINT page_links_target_element_id_fkey FOREIGN KEY (target_page_element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page
    ADD CONSTRAINT pages_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.app(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_c
    ADD CONSTRAINT prop_c_libary_id_fkey FOREIGN KEY (libary_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_prop_c_id_fkey FOREIGN KEY (prop_c_id) REFERENCES public.prop_c(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_prop_type_id_fkey FOREIGN KEY (prop_type_id) REFERENCES public.prop_type(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_type_c
    ADD CONSTRAINT prop_type_c_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_type
    ADD CONSTRAINT prop_type_prop_type_c_id_fkey FOREIGN KEY (prop_type_c_id) REFERENCES public.prop_type_c(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_type
    ADD CONSTRAINT prop_type_value_type_fkey FOREIGN KEY (value_type) REFERENCES public.value_type(value) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.prop_value
    ADD CONSTRAINT prop_value_prop_id_fkey FOREIGN KEY (prop_id) REFERENCES public.prop(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_value
    ADD CONSTRAINT prop_value_tag_prop_value_id_fkey FOREIGN KEY (prop_value_id) REFERENCES public.prop_value(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_value
    ADD CONSTRAINT prop_value_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_value
    ADD CONSTRAINT prop_value_type_fkey FOREIGN KEY (type) REFERENCES public.value_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.style_atom
    ADD CONSTRAINT style_atom_atom_id_fkey FOREIGN KEY (atom_id) REFERENCES public.atom(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style_atom
    ADD CONSTRAINT style_atom_style_id_fkey FOREIGN KEY (style_id) REFERENCES public.style(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style_component_element
    ADD CONSTRAINT style_component_element_component_element_id_fkey FOREIGN KEY (component_element_id) REFERENCES public.component_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style_component_element
    ADD CONSTRAINT style_component_element_style_id_fkey FOREIGN KEY (style_id) REFERENCES public.style(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style_page_element
    ADD CONSTRAINT style_page_element_page_element_id_fkey FOREIGN KEY (page_element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style_page_element
    ADD CONSTRAINT style_page_element_style_id_fkey FOREIGN KEY (style_id) REFERENCES public.style(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style
    ADD CONSTRAINT style_prop_c_id_fkey FOREIGN KEY (prop_c_id) REFERENCES public.prop_c(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.style
    ADD CONSTRAINT styles_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_atom
    ADD CONSTRAINT tag_atom_atom_id_fkey FOREIGN KEY (atom_id) REFERENCES public.atom(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_atom
    ADD CONSTRAINT tag_atom_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_component
    ADD CONSTRAINT tag_component_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_component
    ADD CONSTRAINT tag_component_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_hoc
    ADD CONSTRAINT tag_hoc_hoc_id_fkey FOREIGN KEY (hoc_id) REFERENCES public.hoc(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_hoc
    ADD CONSTRAINT tag_hoc_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_c
    ADD CONSTRAINT tag_prop_c_prop_c_id_fkey FOREIGN KEY (prop_c_id) REFERENCES public.prop_c(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_c
    ADD CONSTRAINT tag_prop_c_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_type_c
    ADD CONSTRAINT tag_prop_type_c_prop_type_c_id_fkey FOREIGN KEY (prop_type_c_id) REFERENCES public.prop_type_c(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_prop_type_c
    ADD CONSTRAINT tag_prop_type_c_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_style
    ADD CONSTRAINT tag_style_style_id_fkey FOREIGN KEY (style_id) REFERENCES public.style(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag_style
    ADD CONSTRAINT tag_style_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tags_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT vertex_edges_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT vertices_type_fkey FOREIGN KEY (type) REFERENCES public.atom_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
