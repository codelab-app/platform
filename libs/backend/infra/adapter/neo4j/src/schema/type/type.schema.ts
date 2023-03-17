import { __ElementTypeKind } from '@codelab/shared/abstract/core'
import { gql } from 'apollo-server-micro'
import {
  getTypeDescendants,
  getTypeReferences,
  isTypeDescendantOf,
} from '../../cypher/type'

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
    RenderPropsType
    ReactNodeType
    UnionType
    CodeMirrorType
    PageType
    AppType
    ActionType
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

  input BaseTypesWhere {
    name: String
  }

  input GetBaseTypesOptions {
    limit: Int
    offset: Int
    where: BaseTypesWhere
  }

  type GetBaseTypesReturn {
    items: [BaseType!]!
    totalCount: Int!
  }

  type Query {
    """
    Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion
    """
    isTypeDescendantOf(parentTypeId: ID!, descendantTypeId: ID!): Boolean
      @cypher(statement: """${isTypeDescendantOf}""")

    """
    Returns a list of all Type and Atom entities that reference the type with the given id
    This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
    """
    getTypeReferences(typeId: ID!): [TypeReference!]
      @cypher(statement: """${getTypeReferences}""")

    baseTypes(
      options: GetBaseTypesOptions
    ): GetBaseTypesReturn!
  }

  interface IBaseType {
    id: ID! @id(autogenerate: false)
    kind: TypeKind! @readonly
    name: String!
    # fields: [Field!]! @relationship(type: "FIELD_TYPE", direction: OUT)
    # we don't need an @auth here, because the User's @auth already declares rules for connect/disconnect
    owner: User!
      @relationship(
        type: "OWNED_BY",
        direction: OUT
      )
  }

  # for defining returning data only
  type BaseType implements IBaseType @exclude(operations: [CREATE, READ, UPDATE, DELETE]) {
    id: ID!
    kind: TypeKind!
    name: String! @unique
    owner: User!
  }

  # https://github.com/neo4j/graphql/issues/1105
  extend interface IBaseType
  @auth(
    rules: [
      {
        operations: [UPDATE, CREATE, DELETE]
        roles: ["User"]
        where: { owner: { auth0Id: "$jwt.sub" } }
        bind: { owner: { auth0Id: "$jwt.sub" } }
      }
      {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          # Admin can access all types, so no need for where
          # where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
      }
    ]
  )

  interface WithDescendants {
    descendantTypesIds: [ID!]!
        @cypher(statement: """${getTypeDescendants}""")
  }

  """
  Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean
  """
  type PrimitiveType implements IBaseType @node(labels: ["Type", "PrimitiveType"])  {
    id: ID!
    kind: TypeKind! @default(value: PrimitiveType)
    name: String! @unique
    owner: User!
    # There seems to be an issue with the unique constrain right now https://github.com/neo4j/graphql/issues/915
    primitiveKind: PrimitiveTypeKind! @unique
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
  type ArrayType implements IBaseType & WithDescendants @node(labels: ["Type", "ArrayType"]) {
    id: ID!
    kind: TypeKind! @default(value: ArrayType)
    name: String!
    owner: User!
    descendantTypesIds: [ID!]!
    itemType: IBaseType!
      @relationship(
        type: "ARRAY_ITEM_TYPE",
        direction: OUT,
      )
  }

  """
  Allows picking one of a set of types
  """
  type UnionType implements IBaseType & WithDescendants @node(labels: ["Type", "UnionType"]) {
    id: ID!
    kind: TypeKind! @default(value: UnionType)
    name: String! @unique
    owner: User!
    descendantTypesIds: [ID!]!
    typesOfUnionType: [AnyType!]!
      @relationship(
        type: "UNION_TYPE_CHILD",
        direction: OUT,
      )
  }


  """
  The idea is that admin create interfaces and can assign a default value to be used by the interface
  """
  interface OwnedBy @relationshipProperties {
    data: String! @default(value: "{}")
  }

  """
  Represents an object type with multiple fields
  """
  type InterfaceType implements IBaseType & WithDescendants @node(labels: ["Type", "InterfaceType"]) {
    id: ID!
    kind: TypeKind! @default(value: InterfaceType)
    name: String!
    owner: User!
    field: Field @relationship(type: "FIELD_TYPE", direction: IN)
    descendantTypesIds: [ID!]!
    # List of atoms that have this interface as their api type
    apiOfAtoms: [Atom!]!
      @relationship(
        type: "ATOM_API",
        direction: IN
      )
    # Fields are defined as a set of list to other types
    # The field data is stored as relationship properties
    fields: [Field!]!
      @relationship(
        type: "INTERFACE_FIELD"
        direction: OUT
      )
  }

  """
  Allows picking an element from the current tree
  Is passed to the rendered element as a React node
  Prop values for this type have the shape of TypedValue in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropsType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ElementType implements IBaseType @node(labels: ["Type", "ElementType"])  {
    id: ID!
    kind: TypeKind! @default(value: ElementType)
    name: String!
    owner: User!
    """
    Allows scoping the type of element to only descendants, children or all elements
    """
    elementKind: ElementTypeKind!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a function that takes props as input
  and returns a React element: '(props) => ReactNode'
  Prop values for this type have the shape of TypedValue in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropsType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type RenderPropsType implements IBaseType @node(labels: ["Type", "RenderPropsType"]) {
    id: ID!
    kind: TypeKind! @default(value: RenderPropsType)
    name: String!
    owner: User!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a React node: \`ReactNode\`
  Prop values for this type have the shape of TypedValue in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropsType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNode' value
  """
  type ReactNodeType implements IBaseType @node(labels: ["Type", "ReactNodeType"]) {
    id: ID!
    kind: TypeKind! @default(value: ReactNodeType)
    name: String!
    owner: User!
  }

  ${elementTypeTypeKindSchema}

  """
  Allows choosing one of a set of allowed values.
  The value gets passed to the render pipe as a Enum Type Value id.
  The actual value must be de-referenced by the id.
  """
  type EnumType implements IBaseType @node(labels: ["Type", "EnumType"]) {
    id: ID!
    kind: TypeKind! @default(value: EnumType)
    name: String!
    owner: User!
    # Allows reverse lookup and get all api's enums
    field: Field @relationship(type: "FIELD_TYPE", direction: IN)
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
  type LambdaType implements IBaseType @node(labels: ["Type", "LambdaType"]) {
    id: ID!
    kind: TypeKind! @default(value: LambdaType)
    name: String!
    owner: User!
  }

  """
  Allows picking a page from the list of pages
  """
  type PageType implements IBaseType @node(labels: ["Type", "PageType"]) {
    id: ID!
    kind: TypeKind! @default(value: PageType)
    name: String!
    owner: User!
  }

  """
  Allows picking a app from the list of apps
  """
  type AppType implements IBaseType @node(labels: ["Type", "AppType"]) {
    id: ID!
    kind: TypeKind! @default(value: AppType)
    name: String!
    owner: User!
  }

  """
  Allows picking a action from the list of actions
  """
  type ActionType implements IBaseType @node(labels: ["Type", "ActionType"]) {
    id: ID!
    kind: TypeKind! @default(value: ActionType)
    name: String!
    owner: User!
  }

  """
  Allows editing the value using a code mirror editor
  """
  type CodeMirrorType implements IBaseType @node(labels: ["Type", "CodeMirrorType"]) {
    id: ID!
    kind: TypeKind! @default(value: CodeMirrorType)
    name: String!
    owner: User!
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
    ElementType |
    RenderPropsType |
    ReactNodeType |
    EnumType |
    LambdaType |
    PageType |
    AppType |
    ActionType |
    CodeMirrorType
`
