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
} = DgraphEntityType

export const dgraphSchema = `
  type ${Tree} {
    name: string
    root: ${Node}
  }

  type ${Node} {
    name: string
    children: [${Node}]
  }

  type ${User} {
    auth0Id: string
    apps: [${App}]
    roles: [string]
    types: [${Type}]
    tags: [${Tag}]
  }
  auth0Id: string @index(hash) .
  apps: [uid] @reverse .
  roles: [string] .
  types: [uid] @reverse .
  tags: [uid] @reverse .

  type ${App} {
    ownerId: string
    name: string
    pages: [${Page}]
  }

  type ${Page} {}

  type ${Component} {}

  type ${Tag} {
    owner: ${User}
    name: string
  }

  type ${Library} {
    ownerId: string
    name: string
    atoms: [${Atom}]
    components: [${Component}]
  }

  type ${Element} {
    component: ${Component}
    atom: ${Atom}
    props: string
    css: string
    hooks: [${Hook}]
    renderForEachPropKey
    renderIfPropKey
    propMapBindings
    propTransformationJs
  }

  type ${Atom} {
    name: string
    atomType: string
    api: [${InterfaceType}]
  }

  type ${Type} {
    owner: ${User}
    name: string
  }

  type ${PrimitiveType} {
    primitiveKind: string
  }

  type ${ArrayType} {
    itemType: string
  }

  type ${EnumTypeValue} {
    name: string
    stringValue: string
  }

  type ${EnumType} {
    allowedValues: [${EnumTypeValue}]
  }

  type ${LambdaType} {
  }

  type ${ComponentType} {
  }

  type ${ElementType} {
    kind: string
  }

  type ${InterfaceType} {
    fields: [${Field}]
  }

  type ${Field} {
    type: ${Type}
    key: string
    name: string
    description: string
  }

  type ${Lambda} {
    ownerId: string
    name: string
    body: string
  }

  type ${Hook} {
    hookType: string
    configJson: string
  }

  type ${PropMapBinding} {
    targetElement: ${Element}
    sourceKey: string
    targetKey: string
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
