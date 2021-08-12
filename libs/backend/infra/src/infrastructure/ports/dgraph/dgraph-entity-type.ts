/**
 * All the Type definitions in the dgraph schema
 * Not calling it DgraphType, because it can get confused with our Type entity
 */
export enum DgraphEntityType {
  Tree = 'Tree',
  Page = 'Page',
  Tag = 'Tag',
  Component = 'Component',
  Library = 'Library',
  Node = 'Node',
  App = 'App',
  Element = 'Element',
  Atom = 'Atom',
  Type = 'Type',
  PrimitiveType = 'PrimitiveType',
  ArrayType = 'ArrayType',
  EnumTypeValue = 'EnumTypeValue',
  EnumType = 'EnumType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  ElementType = 'ElementType',
  Field = 'Field',
  Prop = 'Prop',
  Lambda = 'Lambda',
}
