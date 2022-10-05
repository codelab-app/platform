import * as cg from '@codelab/shared/abstract/codegen'

export interface IUpdateTypeArgs {
  update: IUpdateTypeInput
  disconnect?: IDisconnectOwnerInput
  connect?: IconnectOwnerInput
  delete?: IDeleteTypeInput
}

export type ICreateTypeInput =
  | cg.AppTypeCreateInput
  | cg.ActionTypeCreateInput
  | cg.ArrayTypeCreateInput
  | cg.ElementTypeCreateInput
  | cg.EnumTypeCreateInput
  | cg.InterfaceTypeCreateInput
  | cg.LambdaTypeCreateInput
  | cg.CodeMirrorTypeCreateInput
  | cg.PageTypeCreateInput
  | cg.PrimitiveTypeCreateInput
  | cg.ReactNodeTypeCreateInput
  | cg.RenderPropsTypeCreateInput
  | cg.UnionTypeCreateInput

export type IUpdateTypeInput =
  | cg.AppTypeUpdateInput
  | cg.ArrayTypeUpdateInput
  | cg.ElementTypeUpdateInput
  | cg.EnumTypeUpdateInput
  | cg.InterfaceTypeUpdateInput
  | cg.LambdaTypeUpdateInput
  | cg.CodeMirrorTypeUpdateInput
  | cg.PageTypeUpdateInput
  | cg.PrimitiveTypeUpdateInput
  | cg.ReactNodeTypeUpdateInput
  | cg.RenderPropsTypeUpdateInput
  | cg.UnionTypeUpdateInput

/**
 * Connect
 */

export type IconnectOwnerInput =
  | cg.AppTypeConnectInput
  | cg.ArrayTypeConnectInput
  | cg.ElementTypeConnectInput
  | cg.EnumTypeConnectInput
  | cg.InterfaceTypeConnectInput
  | cg.LambdaTypeConnectInput
  | cg.CodeMirrorTypeConnectInput
  | cg.PageTypeConnectInput
  | cg.PrimitiveTypeConnectInput
  | cg.ReactNodeTypeConnectInput
  | cg.RenderPropsTypeConnectInput
  | cg.UnionTypeConnectInput

/**
 * Disconnect
 */
export type IDisconnectOwnerInput =
  | cg.AppTypeDisconnectInput
  | cg.ArrayTypeDisconnectInput
  | cg.ElementTypeDisconnectInput
  | cg.EnumTypeDisconnectInput
  | cg.InterfaceTypeDisconnectInput
  | cg.LambdaTypeDisconnectInput
  | cg.CodeMirrorTypeDisconnectInput
  | cg.PageTypeDisconnectInput
  | cg.PrimitiveTypeDisconnectInput
  | cg.ReactNodeTypeDisconnectInput
  | cg.RenderPropsTypeDisconnectInput
  | cg.UnionTypeDisconnectInput

/**
 * Delete
 */

export type IDeleteTypeInput =
  | cg.AppTypeDeleteInput
  | cg.ArrayTypeDeleteInput
  | cg.ElementTypeDeleteInput
  | cg.EnumTypeDeleteInput
  | cg.InterfaceTypeDeleteInput
  | cg.LambdaTypeDeleteInput
  | cg.CodeMirrorTypeDeleteInput
  | cg.PageTypeDeleteInput
  | cg.PrimitiveTypeDeleteInput
  | cg.ReactNodeTypeDeleteInput
  | cg.RenderPropsTypeDeleteInput
  | cg.UnionTypeDeleteInput
