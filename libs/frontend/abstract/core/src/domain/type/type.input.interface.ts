import type * as cg from '@codelab/shared/abstract/codegen'

export interface IUpdateTypeArgs {
  update: IUpdateTypeInput
  disconnect?: IDisconnectNodeInput
  connect?: IconnectNodeInput
  delete?: IDeleteTypeInput
  where: ITypeWhere
}

type ITypeWhere =
  | cg.AppTypeWhere
  | cg.ActionTypeWhere
  | cg.ArrayTypeWhere
  | cg.ElementTypeWhere
  | cg.EnumTypeWhere
  | cg.InterfaceTypeWhere
  | cg.LambdaTypeWhere
  | cg.CodeMirrorTypeWhere
  | cg.PageTypeWhere
  | cg.PrimitiveTypeWhere
  | cg.ReactNodeTypeWhere
  | cg.RenderPropsTypeWhere
  | cg.UnionTypeWhere

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

export type IconnectNodeInput =
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
export type IDisconnectNodeInput =
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
