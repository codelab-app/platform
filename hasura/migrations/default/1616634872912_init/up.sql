CREATE TABLE public.app (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id text NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.atom (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type text NOT NULL,
    component_id uuid NOT NULL
);
CREATE TABLE public.atom_types (
    value text NOT NULL,
    description text
);
CREATE TABLE public.attribute (
    key text NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    type text NOT NULL
);
CREATE TABLE public.category (
    id uuid DEFAULT gen_random_uuid() NOT NULL
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
    atom_id uuid NOT NULL
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
    app_id uuid NOT NULL,
    owner_id text NOT NULL
);
CREATE TABLE public.page_element (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    component_id uuid NOT NULL,
    page_id uuid NOT NULL,
    name text
);
CREATE TABLE public.page_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_id uuid NOT NULL,
    source_element_id uuid NOT NULL,
    target_element_id uuid NOT NULL,
    props jsonb,
    "order" integer
);
CREATE TABLE public.prop (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    library_id uuid NOT NULL
);
CREATE TABLE public.prop_element (
    prop_id uuid NOT NULL,
    element_id uuid NOT NULL
);
CREATE TABLE public.prop_value_tag (
    prop_value_id uuid NOT NULL,
    tag_id uuid NOT NULL
);
CREATE TABLE public.prop_value_type (
    value text NOT NULL,
    description text
);
CREATE TABLE public.prop_values (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    lambda_id uuid,
    parent_prop_id uuid NOT NULL,
    value text,
    value_prop_id uuid
);
COMMENT ON COLUMN public.prop_values.lambda_id IS 'This is used as a value';
COMMENT ON COLUMN public.prop_values.parent_prop_id IS 'This is the prop that owns this value';
COMMENT ON COLUMN public.prop_values.value_prop_id IS 'This is the prop that is used as a value';
CREATE TABLE public.style (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    library_id uuid NOT NULL
);
CREATE TABLE public.tag (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    category_id uuid
);
CREATE TABLE public."user" (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text
);
ALTER TABLE ONLY public.app
    ADD CONSTRAINT apps_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_elements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.component
    ADD CONSTRAINT components_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page_element
    ADD CONSTRAINT elements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lambda
    ADD CONSTRAINT lambdas_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.library
    ADD CONSTRAINT libraries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page_links
    ADD CONSTRAINT page_links_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.page
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop_element
    ADD CONSTRAINT prop_element_pkey PRIMARY KEY (prop_id, element_id);
ALTER TABLE ONLY public.prop_value_tag
    ADD CONSTRAINT prop_value_tag_pkey PRIMARY KEY (prop_value_id, tag_id);
ALTER TABLE ONLY public.prop_value_type
    ADD CONSTRAINT prop_value_types_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.prop_values
    ADD CONSTRAINT prop_values_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.prop
    ADD CONSTRAINT props_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.style
    ADD CONSTRAINT styles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.atom_types
    ADD CONSTRAINT "vertexType_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT vertex_edge_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT vertices_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.app
    ADD CONSTRAINT apps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.attribute
    ADD CONSTRAINT attributes_type_fkey FOREIGN KEY (type) REFERENCES public.atom_types(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.component_element
    ADD CONSTRAINT component_elements_atom_id_fkey FOREIGN KEY (atom_id) REFERENCES public.atom(id) ON UPDATE RESTRICT ON DELETE CASCADE;
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
ALTER TABLE ONLY public.lambda
    ADD CONSTRAINT lambdas_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.library
    ADD CONSTRAINT libraries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_links
    ADD CONSTRAINT page_links_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.page(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_links
    ADD CONSTRAINT page_links_source_element_id_fkey FOREIGN KEY (source_element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page_links
    ADD CONSTRAINT page_links_target_element_id_fkey FOREIGN KEY (target_element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page
    ADD CONSTRAINT pages_app_id_fkey FOREIGN KEY (app_id) REFERENCES public.app(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.page
    ADD CONSTRAINT pages_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_element
    ADD CONSTRAINT prop_element_element_id_fkey FOREIGN KEY (element_id) REFERENCES public.page_element(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_element
    ADD CONSTRAINT prop_element_prop_id_fkey FOREIGN KEY (prop_id) REFERENCES public.prop(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_value_tag
    ADD CONSTRAINT prop_value_tag_prop_value_id_fkey FOREIGN KEY (prop_value_id) REFERENCES public.prop_values(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_value_tag
    ADD CONSTRAINT prop_value_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_values
    ADD CONSTRAINT prop_values_lambda_id_fkey FOREIGN KEY (lambda_id) REFERENCES public.lambda(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.prop_values
    ADD CONSTRAINT prop_values_parent_prop_id_fkey FOREIGN KEY (parent_prop_id) REFERENCES public.prop(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.prop_values
    ADD CONSTRAINT prop_values_type_fkey FOREIGN KEY (type) REFERENCES public.prop_value_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.prop_values
    ADD CONSTRAINT prop_values_value_prop_id_fkey FOREIGN KEY (value_prop_id) REFERENCES public.prop(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.prop
    ADD CONSTRAINT props_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.style
    ADD CONSTRAINT styles_library_id_fkey FOREIGN KEY (library_id) REFERENCES public.library(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tags_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE RESTRICT ON DELETE SET NULL;
ALTER TABLE ONLY public.component_link
    ADD CONSTRAINT vertex_edges_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT vertices_component_id_fkey FOREIGN KEY (component_id) REFERENCES public.component(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.atom
    ADD CONSTRAINT vertices_type_fkey FOREIGN KEY (type) REFERENCES public.atom_types(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
