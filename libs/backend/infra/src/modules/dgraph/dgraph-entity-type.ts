/**
 * All the Type definitions in the dgraph schema
 * Not calling it DgraphType, because it can get confused with our Type entity
 */
export enum DgraphEntityType {
  Page = 'Page',
  Tag = 'Tag',
  TagTree = 'TagTree',
  Library = 'Library',
  App = 'App',
  User = 'User',
  Element = 'Element',
  Atom = 'Atom',
  Type = 'Type',
  EnumTypeValue = 'EnumTypeValue',
  Field = 'Field',
  Lambda = 'Lambda',
  Hook = 'Hook',
  PropMapBinding = 'PropMapBinding',
}
