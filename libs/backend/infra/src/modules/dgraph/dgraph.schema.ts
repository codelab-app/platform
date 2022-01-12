/**
 * If you add new types, add them to ./dgraph-entity-type
 */
import { DgraphEntityType } from './dgraph-entity-type'

const {
  Type,
  Element,
  Field,
  Page,
  Atom,
  Library,
  EnumTypeValue,
  User,
  App,
  Lambda,
  Hook,
  PropMapBinding,
  Tag,
  Prop,
} = DgraphEntityType

export const dgraphSchema = `
  type ${Prop} {
    data
  }

  data: string .

  type ${Tag} {
    name
    owner
    parent
    children
    isRoot
  }
  parent: uid .
  isRoot: bool .


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
    owner
    name
    pages
  }
  pages: [uid] @reverse .


  type ${Page} {
    name
    root
  }

  type ${Library} {
    ownerId
    name
    atoms
    components
  }
  atoms: [uid] @reverse .
  components: [uid] @reverse .


  type ${Element} {
    name
    component
    atom
    instanceOfComponent
    fixedId
    css
    hooks
    props
    renderForEachPropKey
    renderIfPropKey
    propMapBindings
    propTransformationJs
    owner
    children
    componentTag
  }

  component: uid @reverse .
  atom: uid @reverse .
  props: uid .
  hooks: [uid] @reverse .
  fixedId: string .
  css: string .
  renderForEachPropKey: string .
  renderIfPropKey: string .
  propMapBindings: [uid] @reverse .
  componentTag: uid @reverse .
  instanceOfComponent: uid @reverse .

  type ${Atom} {
    name
    atomType
    api
    library
  }
  atomType: string @index(term) .
  api: uid @reverse .
  library: uid .


  type ${Type} {
    owner
    name
    typeKind
    primitiveKind
    itemType
    allowedValues
    elementKind
    language
    fields
    typesOfUnionType
  }
  elementKind: string .
  language: string .
  typeKind: string .
  primitiveKind: string .
  typesOfUnionType: [uid] .
  itemType: uid .
  allowedValues: [uid] @reverse .
  fields: [uid] @reverse .
  propTransformationJs: string .


  type ${EnumTypeValue} {
    name
    stringValue
    order
  }
  stringValue: string .
  order: int .

  type ${Field} {
    type
    key
    name
    description
  }
  type: uid @reverse .
  key: string @index(term) .
  description: string .


  type ${Lambda} {
    ownerId
    name
    body
  }
  body: string .


  type ${Hook} {
    hookType
    hookConfig
  }
  hookType: string @index(term)  .
  hookConfig: uid @reverse .


  type ${PropMapBinding} {
    targetElement
    sourceKey
    targetKey
  }
  targetElement: uid .
  sourceKey: string .
  targetKey: string .


  name: string @index(term, trigram) .
  children: [uid] @reverse .
  owner: uid @reverse .
  ownerId: string @index(hash) .
  root: uid @reverse .
`
