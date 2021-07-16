/**
 * All the Type definitions in the dgraph schema
 * Not calling it DgraphType, because it can get confused with our Type entity
 */
export enum DgraphEntityType {
  Tree = 'Tree',
  Page = 'Page',
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
  Field = 'Field',
  StringValue = 'StringValue',
  IntValue = 'IntValue',
  BooleanValue = 'BooleanValue',
  ArrayValue = 'ArrayValue',
  FloatValue = 'FloatValue',
  InterfaceValue = 'InterfaceValue',
  Prop = 'Prop',
}
