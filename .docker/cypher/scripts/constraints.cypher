// https://neo4j.com/docs/cypher-manual/current/constraints/syntax/#create-property-uniqueness-constraints
//
// App constraints
DROP CONSTRAINT app_id IF EXISTS;
CREATE CONSTRAINT app_id IF NOT EXISTS
FOR (n:App)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT app_composite_key IF EXISTS;
CREATE CONSTRAINT app_composite_key IF NOT EXISTS
FOR (n:App)
REQUIRE n.compositeKey IS UNIQUE;

// Atom constraints
DROP CONSTRAINT atom_id IF EXISTS;
CREATE CONSTRAINT atom_id IF NOT EXISTS
FOR (n:Atom)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT atom_type IF EXISTS;
CREATE CONSTRAINT atom_type IF NOT EXISTS
FOR (n:Atom)
REQUIRE n.type IS UNIQUE;

DROP CONSTRAINT atom_name IF EXISTS;
CREATE CONSTRAINT atom_name IF NOT EXISTS
FOR (n:Atom)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT atom_external_source_type IF EXISTS;
CREATE CONSTRAINT atom_external_source_type IF NOT EXISTS
FOR (n:Atom)
REQUIRE n.externalSourceType IS UNIQUE;

// Auth constraints
DROP CONSTRAINT auth_guard_id IF EXISTS;
CREATE CONSTRAINT auth_guard_id IF NOT EXISTS
FOR (n:AuthGuard)
REQUIRE n.id IS UNIQUE;

// Component constraints
DROP CONSTRAINT component_id IF EXISTS;
CREATE CONSTRAINT component_id IF NOT EXISTS
FOR (n:Component)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT component_composite_key IF EXISTS;
CREATE CONSTRAINT component_composite_key IF NOT EXISTS
FOR (n:Component)
REQUIRE n.compositeKey IS UNIQUE;

// Domain constraints
DROP CONSTRAINT domain_id IF EXISTS;
CREATE CONSTRAINT domain_id IF NOT EXISTS
FOR (n:Domain)
REQUIRE n.id IS UNIQUE;

// Element constraints
DROP CONSTRAINT element_id IF EXISTS;
CREATE CONSTRAINT element_id IF NOT EXISTS
FOR (n:Element)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT element_composite_key IF EXISTS;
CREATE CONSTRAINT element_composite_key IF NOT EXISTS
FOR (n:Element)
REQUIRE n.compositeKey IS UNIQUE;

// Field constraints
DROP CONSTRAINT field_id IF EXISTS;
CREATE CONSTRAINT field_id IF NOT EXISTS
FOR (n:Field)
REQUIRE n.id IS UNIQUE;

// Hook constraints
DROP CONSTRAINT hook_id IF EXISTS;
CREATE CONSTRAINT hook_id IF NOT EXISTS
FOR (n:Hook)
REQUIRE n.id IS UNIQUE;

// Page constraints
DROP CONSTRAINT page_id IF EXISTS;
CREATE CONSTRAINT page_id IF NOT EXISTS
FOR (n:Page)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT page_composite_key IF EXISTS;
CREATE CONSTRAINT page_composite_key IF NOT EXISTS
FOR (n:Page)
REQUIRE n.compositeKey IS UNIQUE;

// Preference constraints
DROP CONSTRAINT preference_id IF EXISTS;
CREATE CONSTRAINT preference_id IF NOT EXISTS
FOR (n:Preference)
REQUIRE n.id IS UNIQUE;

// Prop constraints
DROP CONSTRAINT prop_id IF EXISTS;
CREATE CONSTRAINT prop_id IF NOT EXISTS
FOR (n:Prop)
REQUIRE n.id IS UNIQUE;

// Redirect constraints
DROP CONSTRAINT redirect_id IF EXISTS;
CREATE CONSTRAINT redirect_id IF NOT EXISTS
FOR (n:Redirect)
REQUIRE n.id IS UNIQUE;

// Resource constraints
DROP CONSTRAINT resource_id IF EXISTS;
CREATE CONSTRAINT resource_id IF NOT EXISTS
FOR (n:Resource)
REQUIRE n.id IS UNIQUE;

// Store constraints
DROP CONSTRAINT store_id IF EXISTS;
CREATE CONSTRAINT store_id IF NOT EXISTS
FOR (n:Store)
REQUIRE n.id IS UNIQUE;

// Tag constraints
DROP CONSTRAINT tag_id IF EXISTS;
CREATE CONSTRAINT tag_id IF NOT EXISTS
FOR (n:Tag)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT tag_name IF EXISTS;
CREATE CONSTRAINT tag_name IF NOT EXISTS
FOR (n:Tag)
REQUIRE n.name IS UNIQUE;

// Type constraints
DROP CONSTRAINT primitive_type_id IF EXISTS;
CREATE CONSTRAINT primitive_type_id IF NOT EXISTS
FOR (n:PrimitiveType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT primitive_type_name IF EXISTS;
CREATE CONSTRAINT primitive_type_name IF NOT EXISTS
FOR (n:PrimitiveType)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT primitive_type_kind IF EXISTS;
CREATE CONSTRAINT primitive_type_kind IF NOT EXISTS
FOR (n:PrimitiveType)
REQUIRE n.primitiveKind IS UNIQUE;

DROP CONSTRAINT array_type_id IF EXISTS;
CREATE CONSTRAINT array_type_id IF NOT EXISTS
FOR (n:ArrayType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT union_type_id IF EXISTS;
CREATE CONSTRAINT union_type_id IF NOT EXISTS
FOR (n:UnionType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT union_type_name IF EXISTS;
CREATE CONSTRAINT union_type_name IF NOT EXISTS
FOR (n:UnionType)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT interface_type_id IF EXISTS;
CREATE CONSTRAINT interface_type_id IF NOT EXISTS
FOR (n:InterfaceType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT element_type_id IF EXISTS;
CREATE CONSTRAINT element_type_id IF NOT EXISTS
FOR (n:ElementType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT render_prop_type_id IF EXISTS;
CREATE CONSTRAINT render_prop_type_id IF NOT EXISTS
FOR (n:RenderPropType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT render_prop_type_name IF EXISTS;
CREATE CONSTRAINT render_prop_type_name IF NOT EXISTS
FOR (n:RenderPropType)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT react_node_type_id IF EXISTS;
CREATE CONSTRAINT react_node_type_id IF NOT EXISTS
FOR (n:ReactNodeType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT react_node_type_name IF EXISTS;
CREATE CONSTRAINT react_node_type_name IF NOT EXISTS
FOR (n:ReactNodeType)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT enum_type_id IF EXISTS;
CREATE CONSTRAINT enum_type_id IF NOT EXISTS
FOR (n:EnumType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT lambda_type_id IF EXISTS;
CREATE CONSTRAINT lambda_type_id IF NOT EXISTS
FOR (n:LambdaType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT page_type_id IF EXISTS;
CREATE CONSTRAINT page_type_id IF NOT EXISTS
FOR (n:PageType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT app_type_id IF EXISTS;
CREATE CONSTRAINT app_type_id IF NOT EXISTS
FOR (n:AppType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT rich_text_type_id IF EXISTS;
CREATE CONSTRAINT rich_text_type_id IF NOT EXISTS
FOR (n:RichTextType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT action_type_id IF EXISTS;
CREATE CONSTRAINT action_type_id IF NOT EXISTS
FOR (n:ActionType)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT action_type_name IF EXISTS;
CREATE CONSTRAINT action_type_name IF NOT EXISTS
FOR (n:ActionType)
REQUIRE n.name IS UNIQUE;

DROP CONSTRAINT code_mirror_type_id IF EXISTS;
CREATE CONSTRAINT code_mirror_type_id IF NOT EXISTS
FOR (n:CodeMirrorType)
REQUIRE n.id IS UNIQUE;

// User constraints
DROP CONSTRAINT user_id IF EXISTS;
CREATE CONSTRAINT user_id IF NOT EXISTS
FOR (n:User)
REQUIRE n.id IS UNIQUE;

DROP CONSTRAINT user_auth0_id IF EXISTS;
CREATE CONSTRAINT user_auth0_id IF NOT EXISTS
FOR (n:User)
REQUIRE n.auth0Id IS UNIQUE;

DROP CONSTRAINT user_email IF EXISTS;
CREATE CONSTRAINT user_email IF NOT EXISTS
FOR (n:User)
REQUIRE n.email IS UNIQUE;

DROP CONSTRAINT user_username IF EXISTS;
CREATE CONSTRAINT user_username IF NOT EXISTS
FOR (n:User)
REQUIRE n.username IS UNIQUE;
