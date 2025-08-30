import { gql } from '@apollo/client'
import {
  getTypeReferences,
  isTypeDescendantOf,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { __ElementTypeKind } from '@codelab/shared-abstract-core'

import { authOwnerOrAdmin } from '../model/user.schema'

const elementTypeTypeKindSchema = `enum ElementTypeKind {
  ${Object.values(__ElementTypeKind).join('\n')}
}`

export const typeSchema = gql`
  enum TypeKind {
    PrimitiveType
    EnumType
    ArrayType
    InterfaceType
    LambdaType
    ElementType
    RenderPropType
    ReactNodeType
    UnionType
    CodeMirrorType
    PageType
    AppType
    ActionType
    RichTextType
    UnknownType
  }

  type TypeReference {
    """
    The name of the resource referencing the type
    """
    name: String!
    """
    The type of resource - Atom, InterfaceType, etc.
    """
    label: String!
  }

  type Query {
    """
    Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion
    """
    isTypeDescendantOf(parentTypeId: ID!, descendantTypeId: ID!): Boolean
      @cypher(statement: """${isTypeDescendantOf} AS isDescendant""", columnName: "isDescendant")

    """
    Returns a list of all Type and Atom entities that reference the type with the given id
    This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
    """
    getTypeReferences(typeId: ID!): [TypeReference!]
      @cypher(statement: """${getTypeReferences} AS typeReferences""", columnName: "typeReferences")
  }

  interface IBaseType {
    id: ID!
    # Disable @settable so we get a discriminated union
    kind: TypeKind!
    name: String!
    # we don't need an @auth here, because the User's @auth already declares rules for connect/disconnect
    owner: User! @declareRelationship
    # This means the type is used by a field
    fieldRefs: [Field!]! @declareRelationship
  }

  interface WithDescendants {
    descendantTypesIds: [ID!]!
  }

  """
  Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean
  """
  type PrimitiveType implements IBaseType @node(labels: ["Type", "PrimitiveType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: PrimitiveType)
    name: String! #@unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # There seems to be an issue with the unique constrain right now https://github.com/neo4j/graphql/issues/915
    primitiveKind: PrimitiveTypeKind! #@unique
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  enum PrimitiveTypeKind {
    String
    Integer
    Boolean
    Number
  }

  """
  ArrayType Allows defining a variable number of items of a given type.
  Contains a reference to another type which is the array item type.
  """
  type ArrayType implements IBaseType & WithDescendants @node(labels: ["Type", "ArrayType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ArrayType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # ArrayTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    itemType: IBaseType!
      @relationship(
        type: "ARRAY_ITEM_TYPE",
        direction: OUT,
      )
  }

  """
  Allows picking one of a set of types
  """
  type UnionType implements IBaseType & WithDescendants @node(labels: ["Type", "UnionType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: UnionType)
    name: String! 
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    typesOfUnionType: [AnyType!]!
      @relationship(
        type: "UNION_TYPE_CHILD",
        direction: OUT,
      )
  }

  """
  Represents an object type with multiple fields
  """
  type InterfaceType implements IBaseType & WithDescendants @node(labels: ["Type", "InterfaceType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: InterfaceType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # InterfaceTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]! @customResolver(requires: "id")
    # List of atoms that have this interface as their api type
    apiOfAtoms: [Atom!]!
      @relationship(
        type: "ATOM_API",
        direction: IN
      )
    # Fields are defined as a set of list to other types
    fields: [Field!]!
      @relationship(
        type: "INTERFACE_FIELD",
        direction: OUT
      )
  }

  """
  Allows picking an element from the current tree
  Is passed to the rendered element as a React node
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ElementType implements IBaseType @node(labels: ["Type", "ElementType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ElementType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    """
    Allows scoping the type of element to only descendants, children or all elements
    """
    elementKind: ElementTypeKind!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a function that takes props as input
  and returns a React element: '(props) => ReactNode'
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type RenderPropType implements IBaseType @node(labels: ["Type", "RenderPropType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: RenderPropType)
    name: String! 
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a React node: \`ReactNode\`
  Prop values for this type have the shape of TypedProp in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ReactNodeType implements IBaseType @node(labels: ["Type", "ReactNodeType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ReactNodeType)
    name: String! 
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  ${elementTypeTypeKindSchema}

  """
  Allows choosing one of a set of allowed values.
  The value gets passed to the render pipe as a Enum Type Value id.
  The actual value must be de-referenced by the id.
  """
  type EnumType implements IBaseType @node(labels: ["Type", "EnumType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: EnumType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    # Allows reverse lookup and get all api's enums
    # EnumTypes can be shared between components/atoms
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    allowedValues: [EnumTypeValue!]!
      @relationship(
        type: "ALLOWED_VALUE",
        direction: OUT,
      )
  }

  type EnumTypeValue {
    enumType: EnumType @relationship(type: "ALLOWED_VALUE", direction: IN)
    id: ID!
    key: String!
    value: String!
  }

  """
  Allows picking a lambda
  """
  type LambdaType implements IBaseType @node(labels: ["Type", "LambdaType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: LambdaType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a page from the list of pages
  """
  type PageType implements IBaseType @node(labels: ["Type", "PageType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: PageType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a app from the list of apps
  """
  type AppType implements IBaseType @node(labels: ["Type", "AppType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: AppType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a app from the list of apps
  """
  type RichTextType implements IBaseType @node(labels: ["Type", "RichTextType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: RichTextType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows picking a action from the list of actions
  """
  type ActionType implements IBaseType @node(labels: ["Type", "ActionType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: ActionType)
    name: String! # @unique
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Represents a type that can accept any value, similar to TypeScript's any type
  """
  type UnknownType implements IBaseType @node(labels: ["Type", "UnknownType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: UnknownType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
  }

  """
  Allows editing the value using a code mirror editor
  """
  type CodeMirrorType implements IBaseType @node(labels: ["Type", "CodeMirrorType"]) ${authOwnerOrAdmin} {
    id: ID!
    kind: TypeKind! @default(value: CodeMirrorType)
    name: String!
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
    fieldRefs: [Field!]! @relationship(type: "FIELD_TYPE", direction: IN)
    language: CodeMirrorLanguage!
  }

  enum CodeMirrorLanguage {
    Typescript
    Javascript
    Css
    Json
    Graphql
    CssInJs
  }

  union AnyType =
    PrimitiveType |
    ArrayType |
    UnionType |
    InterfaceType |
    RenderPropType |
    ReactNodeType |
    EnumType |
    ActionType |
    ElementType |
    LambdaType |
    PageType |
    AppType |
    RichTextType |
    CodeMirrorType |
    UnknownType
`
