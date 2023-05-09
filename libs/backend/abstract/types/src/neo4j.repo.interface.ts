/* eslint-disable @typescript-eslint/member-ordering */
import type { ModelMap } from '@codelab/backend/abstract/codegen'

/**
 * This is the port our application uses, can't use static interfaces, so we sacrifice some use-ability for this architecture.
 *
 * Will have to `new Repository`
 */
export interface INeo4jRepository {
  User: Promise<ModelMap['User']>
  //
  // App
  //
  App: Promise<ModelMap['App']>
  Domain: Promise<ModelMap['Domain']>
  Page: Promise<ModelMap['Page']>
  //
  // Store
  //
  Store: Promise<ModelMap['Store']>
  ApiAction: Promise<ModelMap['ApiAction']>
  CodeAction: Promise<ModelMap['CodeAction']>
  Resource: Promise<ModelMap['Resource']>
  //
  // Component
  //
  Atom: Promise<ModelMap['Atom']>
  Element: Promise<ModelMap['Element']>
  Component: Promise<ModelMap['Component']>
  Tag: Promise<ModelMap['Tag']>
  //
  // Types
  //
  InterfaceType: Promise<ModelMap['InterfaceType']>
  PrimitiveType: Promise<ModelMap['PrimitiveType']>
  UnionType: Promise<ModelMap['UnionType']>
  ArrayType: Promise<ModelMap['ArrayType']>
  EnumType: Promise<ModelMap['EnumType']>
  EnumTypeValue: Promise<ModelMap['EnumTypeValue']>
  LambdaType: Promise<ModelMap['LambdaType']>
  AppType: Promise<ModelMap['AppType']>
  ActionType: Promise<ModelMap['ActionType']>
  RenderPropType: Promise<ModelMap['RenderPropType']>
  ReactNodeType: Promise<ModelMap['ReactNodeType']>
  PageType: Promise<ModelMap['PageType']>
  CodeMirrorType: Promise<ModelMap['CodeMirrorType']>
  ElementType: Promise<ModelMap['ElementType']>
}
