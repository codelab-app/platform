/**
 * !
 * If you change the schema - change the interfaces in ./interfaces too
 * If you add new types, add them to ./dgraph-entity-type
 */
import { DgraphEntityType } from './dgraph-entity-type'

const {
  Type,
  Tree,
  InterfaceType,
  ArrayType,
  Element,
  Field,
  Node,
  EnumType,
  Page,
  Atom,
  Library,
  PrimitiveType,
  EnumTypeValue,
  LambdaType,
  User,
  App,
  Component,
  Lambda,
  ElementType,
  ComponentType,
  Hook,
  PropMapBinding,
  Tag,
  RenderPropsType,
  ReactNodeType,
  UnionType,
} = DgraphEntityType

export const dgraphSchema = `
  type ${Tree} {
    name
    root
  }

  type ${Tag} {
    name
    owner
    parent
    children
    isRoot
  }
  parent: uid .
  isRoot: bool .

  type ${Node} {
    name
    children
  }

  type ${User} {
    auth0Id
    apps
    roles
    types
  }
  auth0Id: string @index(hash) .
  apps: [uid] @reverse .
  roles: [string] .
  types: [uid] @reverse .

  type ${App} {
    ownerId
    name
    pages
  }

  type ${Page} {}

  type ${Component} {}

  type ${Library} {
    ownerId
    name
    atoms
    components
  }

  type ${Element} {
    component
    atom
    props
    css
    hooks
    renderForEachPropKey
    renderIfPropKey
    propMapBindings
    propTransformationJs
  }

  type ${Atom} {
    name
    atomType
    api
    library
  }
  library: uid .

  type ${Type} {
    owner
    name
    tags
  }

  tags: [uid] .

  type ${PrimitiveType} {
    primitiveKind
  }

  type ${ArrayType} {
    itemType
  }

  type ${EnumTypeValue} {
    name
    stringValue
  }

  type ${EnumType} {
    allowedValues
  }

  type ${LambdaType} {
  }

  type ${ComponentType} {
  }

  type ${ReactNodeType} {
  }

  type ${RenderPropsType} {
  }

  type ${ElementType} {
    kind
  }

  type ${InterfaceType} {
    fields
  }

  type ${Field} {
    type
    key
    name
    description
  }

  type ${Lambda} {
    ownerId
    name
    body
  }

  type ${Hook} {
    hookType
    configJson
  }

  type ${PropMapBinding} {
    targetElement
    sourceKey
    targetKey
  }

  type ${UnionType} {
    typesOfUnionType
  }

  name: string @index(term, trigram) .
  description: string .

  children: [uid] @reverse .

  owner: uid @reverse .
  ownerId: string @index(hash) .
  pages: [uid] @reverse .

  component: uid @reverse .
  atom: uid @reverse .
  props: string .
  css: string .

  root: uid @reverse .

  atoms: [uid] @reverse .
  components: [uid] @reverse .

  atomType: string @index(term) .
  api: uid @reverse .

  typesOfUnionType: [uid] .
  primitiveKind: string .
  itemType: uid .

  stringValue: string .
  intValue: int .
  floatValue: float .
  booleanValue: bool .

  values: [uid] .

  allowedValues: [uid] @reverse .

  fields: [uid] @reverse .

  type: uid @reverse .
  key: string @index(term) .

  field: uid @reverse .
  value: uid @reverse .

  body: string .

  kind: string .

  hookType: string @index(hash)  .
  configJson: string .

  hooks: [uid] @reverse .

  renderForEachPropKey: string .
  renderIfPropKey: string .

  targetElement: uid .
  sourceKey: string .
  targetKey: string .
  propMapBindings: [uid] @reverse .

  propTransformationJs: string .
`
