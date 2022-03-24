import { gql } from 'apollo-server-micro'
import getFieldCypher from '../../repositories/type/getField.cypher'
import getTypeDescendantIds from '../../repositories/type/getTypeDescendantIds.cypher'
import getTypeReferencesCypher from '../../repositories/type/getTypeReferences.cypher'
import isTypeDescendantOfCypher from '../../repositories/type/isTypeDescendantOf.cypher'

export const typeSchema = gql`
  input UpsertFieldInput {
    interfaceTypeId: ID!,
    targetTypeId: ID!,
    # This is the original key of the field you want to update. Applicable only for update.
    targetKey: String,
    # This is the new, updated key
    key: String!
    name: String
    description: String
  }

  input DeleteFieldInput {
    interfaceId: ID!
    key: String!
  }

  type DeleteFieldResponse {
    deletedEdgesCount: Int!
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

  type Mutation {
    upsertFieldEdge(input: UpsertFieldInput!, isCreating: Boolean!): InterfaceTypeEdge!
    deleteFieldEdge(input: DeleteFieldInput!): DeleteFieldResponse!
    importTypeGraph(payload: JSONObject!): TypeGraph!
  }

  type Query {
    """
    Does a recursive check to see if the parent type (parentTypeId) contains the descendant type (descendantTypeId) at any level of nesting. Useful for checking for recursion
    """
    isTypeDescendantOf(parentTypeId: ID!, descendantTypeId: ID!): Boolean
      @cypher(statement: """${isTypeDescendantOfCypher}""")

    getField(interfaceId: ID!, key: String!): InterfaceTypeEdge!
      @cypher(statement: """${getFieldCypher}""")

    """
    Returns a list of all Type and Atom entities that reference the type with the given id
    This could be different types of relationships like Atom-Api, ArrayType-itemType, InterfaceType-field, UnionType-unionTypeChild
    """
    getTypeReferences(typeId: ID!): [TypeReference!]
      @cypher(statement: """${getTypeReferencesCypher}""")

    exportGraph(typeId: ID!): JSONObject
  }

  interface TypeBase
  @auth(
    # This makes sure that the the owner is assigned to the current user
    rules: [
      {
        operations: [CREATE, UPDATE]
        bind: { owner: { auth0Id: "$jwt.sub" } }
      }
    ]
  )
  {
    id: ID! @id
    name: String!
    owner: [User!]!
      @relationship(
        type: "OWNED_BY",
        direction: OUT
      )
  }

  # Adding @cypher here doesn't seem to work
  interface WithDescendants {
    descendantTypesIds: [ID!]!
  }

  # A union is needed as a reference point for the type graph
  # For some reason the custom cypher query for the graph doesn't work well if they reference TypeBase - it throws an error saying that it can't resolve the concrete type
  union AnyType =
    | ElementType
    | ArrayType
    | UnionType
    | EnumType
    | LambdaType
    | PageType
    | AppType
    | MonacoType
    | InterfaceType
    | PrimitiveType
    | RenderPropsType
    | ReactNodeType

  # TypeEdge and TypeGraphs are not actual entity nodes in the db, so we @exclude them
  # Their purpose is to serve as return types for the custom cypher query for BaseType.graph

  """
  Connection between two types in a TypeGraph.
  Can be:
  Array -> ArrayItem (Edge)
  Interface -> Field type - (InterfaceTypeEdge)
  Union -> Union member (Edge)
  """
  union TypeEdge = Edge | InterfaceTypeEdge

  """
  Connection between an Interface Type and its fields types.
  The field data is stored as relationship properties and we retreive them along with the relation itself.
  """
  type InterfaceTypeEdge implements Field & IEdge @exclude {
    source: String!
    target: String!
    key: String!
    name: String
    description: String
  }

  type TypeGraph @exclude {
    vertices: [AnyType!]!
    edges: [TypeEdge!]!
  }


  """
  Base atomic building block of the type system. Represents primitive types - String, Integer, Float, Boolean
  """
  type PrimitiveType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
    # There seems to be an issue with the unique constrain right now https://github.com/neo4j/graphql/issues/915
    primitiveKind: PrimitiveTypeKind! @unique
  }

  enum PrimitiveTypeKind {
    String
    Integer
    Float
    Boolean
  }

  """
  ArrayType Allows defining a variable number of items of a given type.
  Contains a reference to another type which is the array item type.
  """
  type ArrayType implements TypeBase & WithDescendants {
    id: ID!
    name: String!
    owner: [User!]!
    descendantTypesIds: [ID!]!
      @cypher(statement: """${getTypeDescendantIds}""")
    graph: TypeGraph!
    # The reason this is an array is that there is a bug with neo4j graphql that appears
    # when referencing a single interface relationship
    # https://github.com/neo4j/graphql/pull/701/files after this is merged we can replace it with a single value
    itemType: [TypeBase!]!
      @relationship(
        type: "ARRAY_ITEM_TYPE",
        direction: OUT,
      )
  }

  """
  Allows picking one of a set of types
  """
  type UnionType implements TypeBase & WithDescendants {
    id: ID!
    name: String!
    owner: [User!]!
    descendantTypesIds: [ID!]!
      @cypher(statement: """${getTypeDescendantIds}""")
    graph: TypeGraph!
    typesOfUnionType: [TypeBase!]!
      @relationship(
        type: "UNION_TYPE_CHILD",
        direction: OUT,
      )
  }

  """
  Represents an object type with multiple fields
  """
  type InterfaceType implements TypeBase & WithDescendants {
    id: ID!
    name: String!
    owner: [User!]!
    descendantTypesIds: [ID!]!
      @cypher(statement: """${getTypeDescendantIds}""")
    graph: TypeGraph!
    # List of atoms that have this interface as their api type
    apiOfAtoms: [Atom!]!
      @relationship(
        type: "ATOM_API",
        direction: IN
      )
    # Fields are defined as a set of list to other types
    # The field data is stored as relationship properties
    fields: [TypeBase!]!
      @relationship(
        type: "INTERFACE_FIELD"
        direction: OUT
        properties: "Field"
      )
  }

  interface Field @relationshipProperties {
    key: String!
    name: String
    description: String
  }

  """
  Allows picking an element from the current tree
  Is passed to the rendered element as a React node
  Prop values for this type have the shape of TypedValue in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropsType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNod' value
  """
  type ElementType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
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
  - ElementType: Current tree element select box, results it 'ReactNod' value
  """
  type RenderPropsType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
  }

  """
  Allows picking a Component from the list of components.
  It is passed to the rendered element as a React node: \`ReactNode\`
  Prop values for this type have the shape of TypedValue in order to
  be distinguished from other element types.
  Comparison between different element types:
  - RenderPropsType: Component select box, results it '(props) => ReactNode' value
  - ReactNodeType: Component select box, results it 'ReactNode' value
  - ElementType: Current tree element select box, results it 'ReactNod' value
  """
  type ReactNodeType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
  }

  enum ElementTypeKind {
    """
    Pick any element in the current tree
    """
    AllElements
    """
    Pick any element from the descendants of the current element
    """
    DescendantsOnly
    """
    Pick any element from the children of the current element
    """
    ChildrenOnly
    """
    Pick parents and siblings of parents of elements (used to move element)
    """
    ExcludeDescendantsElements
  }

  """
  Allows choosing one of a set of allowed values.
  The value gets passed to the render pipe as a Enum Type Value id.
  The actual value must be de-referenced by the id.
  """
  type EnumType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
    allowedValues: [EnumTypeValue!]!
      @relationship(
        type: "ALLOWED_VALUE",
        direction: OUT,
      )
  }

  type EnumTypeValue {
    enumType: EnumType @relationship(type: "ALLOWED_VALUE", direction: IN)
    id: ID!
    name: String
    value: String!
  }

  """
  Allows picking a lambda
  """
  type LambdaType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!

  }

  """
  Allows picking a page from the list of pages
  """
  type PageType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
  }

  """
  Allows picking a app from the list of apps
  """
  type AppType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
  }

  """
  Allows editing the value using a monaco editor
  """
  type MonacoType implements TypeBase {
    id: ID!
    name: String!
    owner: [User!]!
    graph: TypeGraph!
    language: MonacoLanguage!
  }

  enum MonacoLanguage {
    typescript
    javascript
    css
    json
    graphqlDev
    cssInJs
  }
`
