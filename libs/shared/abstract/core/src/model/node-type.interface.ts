/* eslint-disable perfectionist/sort-enums */
/**
 * Contains all the node types that are supported by the system
 */
export enum INodeType {
  /**
   * Action Types
   */
  ApiAction = 'ApiAction',
  CodeAction = 'CodeAction',
  App = 'App',
  Atom = 'Atom',
  AuthGuard = 'AuthGuard',
  Component = 'Component',
  Domain = 'Domain',
  Element = 'Element',
  Field = 'Field',
  Page = 'Page',
  Preference = 'Preference',
  Prop = 'Prop',
  Redirect = 'Redirect',
  Resource = 'Resource',
  Store = 'Store',
  Tag = 'Tag',

  /**
   * Type System Types
   */
  ActionType = 'ActionType',
  AnyType = 'AnyType',
  AppType = 'AppType',
  ArrayType = 'ArrayType',
  CodeMirrorType = 'CodeMirrorType',
  ElementType = 'ElementType',
  EnumType = 'EnumType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  PageType = 'PageType',
  PrimitiveType = 'PrimitiveType',
  ReactNodeType = 'ReactNodeType',
  RenderPropType = 'RenderPropType',
  RichTextType = 'RichTextType',
  UnionType = 'UnionType',
  User = 'User',
}

// export interface IAggregateRoot {
//   //
// }

// export interface IValueObject {
//   //
// }
