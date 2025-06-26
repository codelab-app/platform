# Codelab Neo4j Database Schema Documentation

## Overview

Codelab uses Neo4j as its graph database to represent the complex relationships between users, applications, pages, components, and visual elements. The schema is designed to support a visual web application builder platform where users can create applications through drag-and-drop interfaces.

## Core Entity Model

### User Management

#### User
The central entity for authentication and ownership.

**Attributes:**
- `id`: Unique identifier (indexed)
- `auth0Id`: Auth0 integration ID (unique, indexed)
- `email`: User email (unique, indexed)
- `username`: Username (unique, indexed)
- `name`: Display name
- `picture`: Profile picture URL
- `roles`: Array of role enums (User, Admin)

**Relationships:**
- Owns all user-created entities through `OWNED_BY` relationship
- Connected to Preferences through `OWNED_BY`

#### Preference
Stores user-specific UI preferences for the builder interface.

**Attributes:**
- `id`: Unique identifier (indexed)
- `builderBreakpointType`: Enum (Desktop, MobilePortrait, MobileLandscape, Tablet)
- `builderWidth`: Float value for builder width
- `activeConfigPaneTab`: Enum for active tab (Component, CSS, Node, Page, Props, etc.)

### Application Structure

#### App
Represents a web application created by users.

**Attributes:**
- `id`: Unique identifier (indexed)
- `compositeKey`: User-scoped unique key format: `{userId}-{name}` (unique, indexed)
- `name`: Application name (computed from compositeKey)
- `slug`: URL-friendly slug (computed from compositeKey)

**Relationships:**
- `OWNED_BY` → User: Application owner
- `PAGES` → Page: Application pages
- `APP_DOMAIN` ← Domain: Custom domains

#### Page
Individual pages within an application.

**Attributes:**
- `id`: Unique identifier (indexed)
- `compositeKey`: App-scoped unique key format: `{appId}-{name}` (unique, indexed)
- `name`: Page name (computed)
- `slug`: URL-friendly slug (computed)
- `kind`: PageKind enum (_app, _error, _404, _500, _component, regular, provider)
- `urlPattern`: URL pattern for routing

**Relationships:**
- `PAGES` ← App: Parent application
- `PAGE_ROOT_ELEMENT` → Element: Root element of page tree
- `STORE_CONTAINER_NODE` → Store: Page-level state store
- `CHILD_PAGE_CONTAINER_ELEMENT` → Element: Container for child pages (_app pages)
- `REDIRECT_FROM_PROTECTED_PAGE` → Redirect: Page protection

#### Domain
Custom domains for applications.

**Attributes:**
- `id`: Unique identifier (indexed)
- `name`: Domain name
- `domainConfig`: Configuration object with `misconfigured` boolean

**Relationships:**
- `APP_DOMAIN` → App: Associated application

### Visual Components

#### Element
The building blocks of the visual tree structure. Elements form a doubly-linked tree.

**Attributes:**
- `id`: Unique identifier (indexed)
- `compositeKey`: Unique composite key (indexed)
- `name`: Element name (computed)
- `slug`: URL-friendly slug (computed)
- `style`: JSON string for CSS styles per breakpoint
- `tailwindClassNames`: Array of Tailwind CSS classes
- `childMapperPropKey`: Key for array prop to map over
- `renderForEachPropKey`: Key for render iteration
- `renderIfExpression`: Conditional rendering expression

**Relationships:**
- `NODE_SIBLING` ↔ Element: Next/previous sibling navigation
- `TREE_FIRST_CHILD` ↔ Element: Parent-child tree structure
- `PAGE_ROOT_ELEMENT` ← Page: Root element marker
- `COMPONENT_ROOT_ELEMENT` ← Component: Component root marker
- `PROPS_OF_ELEMENT` → Prop: Element properties
- `ELEMENT_RENDER_TYPE` → Atom/Component: What to render
- `CHILD_MAPPER_COMPONENT` → Component: Component for mapping
- `CHILD_MAPPER_PREVIOUS_SIBLING` ← Element: Position for mapped children
- `PRE_RENDER_ELEMENT_ACTION` → BaseAction: Pre-render actions
- `POST_RENDER_ELEMENT_ACTION` → BaseAction: Post-render actions

#### Component
User-created reusable components.

**Attributes:**
- `id`: Unique identifier (indexed)
- `compositeKey`: User-scoped unique key format: `{userId}-{name}` (indexed)
- `name`: Component name (computed)
- `slug`: URL-friendly slug (computed)

**Relationships:**
- `OWNED_BY` → User: Component owner
- `COMPONENT_ROOT_ELEMENT` → Element: Root element
- `COMPONENT_API` → InterfaceType: Component API definition
- `STORE_CONTAINER_NODE` → Store: Component state
- `PROPS_OF_COMPONENT` → Prop: Component properties

#### Atom
Pre-built UI components (HTML elements, React components).

**Attributes:**
- `id`: Unique identifier (indexed)
- `type`: AtomType enum (indexed, unique)
- `name`: Atom name (indexed, unique)
- `icon`: Icon identifier
- `externalJsSource`: External JavaScript source
- `externalCssSource`: External CSS source
- `externalSourceType`: Type of external source

**Relationships:**
- `OWNED_BY` → User: Atom owner
- `ATOM_API` → InterfaceType: Atom API definition
- `TAGS_WITH` → Tag: Categorization tags
- `REQUIRED_PARENTS` → Atom: Parent requirements
- `ALLOWED_CHILDREN` → Atom: Suggested children
- `ELEMENT_RENDER_TYPE` ← Element: Elements using this atom

### Type System

The type system is implemented as a discriminated union with a base interface `IBaseType` and multiple concrete type implementations.

#### Base Type Interface (IBaseType)
**Common Attributes:**
- `id`: Unique identifier
- `kind`: TypeKind discriminator
- `name`: Type name
- `owner`: User relationship

#### Type Implementations

##### PrimitiveType
Basic data types (String, Integer, Boolean, Number).

**Additional Attributes:**
- `primitiveKind`: Enum of primitive types (unique, indexed)

##### ArrayType
Variable-length arrays of a specific type.

**Relationships:**
- `ARRAY_ITEM_TYPE` → IBaseType: Array element type

##### UnionType
Choice between multiple types.

**Relationships:**
- `UNION_TYPE_CHILD` → AnyType: Possible types in union

##### InterfaceType
Object types with multiple fields.

**Relationships:**
- `INTERFACE_FIELD` → Field: Object fields
- `ATOM_API` ← Atom: Atoms using this interface
- `COMPONENT_API` ← Component: Components using this interface

##### EnumType
Enumeration with allowed values.

**Relationships:**
- `ALLOWED_VALUE` → EnumTypeValue: Enum values

##### Other Types
- **ElementType**: References elements in the tree
- **RenderPropType**: Component as render prop `(props) => ReactNode`
- **ReactNodeType**: Component as React node
- **LambdaType**: Lambda/function references
- **PageType**: Page references
- **AppType**: App references
- **ActionType**: Action references
- **CodeMirrorType**: Code editor with language support
- **RichTextType**: Rich text content

#### Field
Fields within InterfaceType objects.

**Attributes:**
- `id`: Unique identifier (indexed)
- `key`: Field key
- `name`: Display name
- `description`: Field description
- `validationRules`: Validation rules
- `defaultValues`: Default values

**Relationships:**
- `FIELD_TYPE` → IBaseType: Field's type
- `FIELD_SIBLING` ↔ Field: Sibling navigation
- `INTERFACE_FIELD` ← InterfaceType: Parent interface

### State Management

#### Store
State container for pages and components.

**Attributes:**
- `id`: Unique identifier (indexed)
- `name`: Store name

**Relationships:**
- `STORE_STATE_API` → InterfaceType: State shape
- `STORE_ACTION` → BaseAction: Store actions
- `STORE_CONTAINER_NODE` ← Page/Component: Container

#### Actions
Actions for state updates and API calls.

##### BaseAction Interface
Common action properties.

##### CodeAction
Custom code execution.

**Attributes:**
- `id`: Unique identifier
- `name`: Action name
- `type`: ActionKind (CodeAction)
- `code`: JavaScript code to execute

##### ApiAction
API resource calls.

**Attributes:**
- `id`: Unique identifier
- `name`: Action name
- `type`: ActionKind (ApiAction)

**Relationships:**
- `RESOURCE_ACTION` → Resource: API resource
- `ACTION_CONFIG` → Prop: Configuration
- `SUCCESS_ACTION` → AnyAction: Success handler
- `ERROR_ACTION` → AnyAction: Error handler

### Supporting Entities

#### Resource
External API resources.

**Attributes:**
- `id`: Unique identifier (indexed)
- `type`: ResourceType enum (GraphQl, Rest)
- `name`: Resource name

**Relationships:**
- `OWNED_BY` → User: Resource owner
- `RESOURCE_CONFIG` → Prop: Configuration
- `RESOURCE_ACTION` ← ApiAction: Actions using resource
- `RESOURCE_OF_AUTH_GUARD` ← AuthGuard: Auth guards

#### AuthGuard
Authentication and authorization guards.

**Attributes:**
- `id`: Unique identifier (indexed)
- `name`: Guard name
- `responseTransformer`: Response transformation code

**Relationships:**
- `OWNED_BY` → User: Guard owner
- `RESOURCE_OF_AUTH_GUARD` → Resource: Guard resource
- `AUTH_GUARD_CONFIG` → Prop: Configuration
- `PAGE_AUTH_GUARD` ← Redirect: Page redirects

#### Redirect
Page protection and redirection.

**Attributes:**
- `id`: Unique identifier (indexed)
- `targetType`: RedirectTargetType enum (Page, Url)
- `targetUrl`: External URL for Url type

**Relationships:**
- `REDIRECT_FROM_PROTECTED_PAGE` ← Page: Protected page
- `REDIRECT_TO_PAGE` → Page: Target page
- `PAGE_AUTH_GUARD` → AuthGuard: Guard to check

#### Prop
Generic property storage using JSON.

**Attributes:**
- `id`: Unique identifier (indexed)
- `data`: JSON string of property data

**Note:** Props are connected to various entities to store their configuration and property values.

#### Tag
Hierarchical categorization system.

**Attributes:**
- `id`: Unique identifier (indexed)
- `name`: Tag name (unique, indexed)

**Relationships:**
- `OWNED_BY` → User: Tag owner
- `CHILDREN` → Tag: Child tags (hierarchical)
- `TAGS_WITH` ← Atom: Tagged atoms

#### Hook (Referenced but not in active schema)
React hooks configuration.

**Attributes:**
- `id`: Unique identifier (indexed)
- `type`: AtomType

**Relationships:**
- `CONFIG_OF_HOOK` → Prop: Hook configuration
- `HOOKS_OF_ELEMENT` ← Element: Element using hook

## Key Design Patterns

### 1. Ownership Pattern
Most entities implement the `WithOwner` interface, establishing clear ownership through the `OWNED_BY` relationship to User.

### 2. Composite Keys
Many entities use composite keys (e.g., `{userId}-{name}`) to ensure uniqueness within a scope while allowing the same names across different scopes.

### 3. Tree Structure
Elements form a tree using:
- `TREE_FIRST_CHILD` for parent-child relationships
- `NODE_SIBLING` for sibling navigation
- This allows efficient tree traversal

### 4. Type System
The sophisticated type system uses:
- Discriminated unions with `kind` field
- Recursive type definitions (arrays, unions, interfaces)
- Type references through relationships

### 5. Configuration Storage
The `Prop` node type provides flexible JSON storage for various configuration needs across different entities.

### 6. Authorization
Schema includes authorization directives (currently commented out) for:
- Read access for authenticated users
- Full access for admins
- Full access for resource owners

## Performance Considerations

### Indexes
The schema uses extensive indexing on:
- All `id` fields
- Unique constraint fields (`email`, `username`, `compositeKey`, etc.)
- Frequently queried fields

### Relationships
Relationships are designed for:
- Efficient traversal (tree structures)
- Clear ownership hierarchies
- Minimal redundancy

### Custom Resolvers
Some fields use custom resolvers for:
- Computed fields (`name`, `slug` from `compositeKey`)
- Complex traversals (`descendants`, `dependantTypes`)
- Aggregations (`elements` collection on Page)

## Security Considerations

1. **Authentication**: Integration with Auth0 through `auth0Id`
2. **Authorization**: Role-based access control (User, Admin)
3. **Ownership**: Clear ownership model for resource access control
4. **JWT Integration**: Schema supports JWT claims for authorization rules

## Future Extensibility

The schema is designed for extensibility through:
- The flexible type system allowing new type kinds
- The tag system for categorization
- The prop system for configuration storage
- Clear separation of concerns between entities

This architecture supports the complex requirements of a visual application builder while maintaining performance and flexibility for future enhancements.