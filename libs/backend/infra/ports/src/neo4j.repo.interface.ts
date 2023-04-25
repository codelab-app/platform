/* eslint-disable @typescript-eslint/member-ordering */
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

/**
 * This is the port our application uses, can't use static interfaces, so we sacrifice some use-ability for this architecture.
 *
 * Will have to `new Repository`
 */
export interface INeo4jRepository {
  User: Promise<OGM_TYPES.ModelMap['User']>
  //
  // App
  //
  App: Promise<OGM_TYPES.ModelMap['App']>
  Domain: Promise<OGM_TYPES.ModelMap['Domain']>
  Page: Promise<OGM_TYPES.ModelMap['Page']>
  //
  // Store
  //
  Store: Promise<OGM_TYPES.ModelMap['Store']>
  ApiAction: Promise<OGM_TYPES.ModelMap['ApiAction']>
  CodeAction: Promise<OGM_TYPES.ModelMap['CodeAction']>
  Resource: Promise<OGM_TYPES.ModelMap['Resource']>
  //
  // Component
  //
  Atom: Promise<OGM_TYPES.ModelMap['Atom']>
  Element: Promise<OGM_TYPES.ModelMap['Element']>
  Component: Promise<OGM_TYPES.ModelMap['Component']>
  Tag: Promise<OGM_TYPES.ModelMap['Tag']>
  //
  // Types
  //
  InterfaceType: Promise<OGM_TYPES.ModelMap['InterfaceType']>
  PrimitiveType: Promise<OGM_TYPES.ModelMap['PrimitiveType']>
  UnionType: Promise<OGM_TYPES.ModelMap['UnionType']>
  ArrayType: Promise<OGM_TYPES.ModelMap['ArrayType']>
  EnumType: Promise<OGM_TYPES.ModelMap['EnumType']>
  EnumTypeValue: Promise<OGM_TYPES.ModelMap['EnumTypeValue']>
  LambdaType: Promise<OGM_TYPES.ModelMap['LambdaType']>
  AppType: Promise<OGM_TYPES.ModelMap['AppType']>
  ActionType: Promise<OGM_TYPES.ModelMap['ActionType']>
  RenderPropType: Promise<OGM_TYPES.ModelMap['RenderPropType']>
  ReactNodeType: Promise<OGM_TYPES.ModelMap['ReactNodeType']>
  PageType: Promise<OGM_TYPES.ModelMap['PageType']>
  CodeMirrorType: Promise<OGM_TYPES.ModelMap['CodeMirrorType']>
  ElementType: Promise<OGM_TYPES.ModelMap['ElementType']>
}
