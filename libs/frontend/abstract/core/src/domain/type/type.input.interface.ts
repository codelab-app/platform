import type * as cg from '@codelab/shared/abstract/codegen'

export interface IUpdateTypeArgs {
  connect?: IconnectNodeInput
  delete?: IDeleteTypeInput
  disconnect?: IDisconnectNodeInput
  update: IUpdateTypeInput
  where: ITypeWhere
}

type ITypeWhere =
  | cg.ActionTypeWhere
  | cg.AppTypeWhere
  | cg.ArrayTypeWhere
  | cg.CodeMirrorTypeWhere
  | cg.ElementTypeWhere
  | cg.EnumTypeWhere
  | cg.InterfaceTypeWhere
  | cg.LambdaTypeWhere
  | cg.PageTypeWhere
  | cg.PrimitiveTypeWhere
  | cg.ReactNodeTypeWhere
  | cg.RenderPropsTypeWhere
  | cg.UnionTypeWhere

export type ICreateTypeInput =
  | cg.ActionTypeCreateInput
  | cg.AppTypeCreateInput
  | cg.ArrayTypeCreateInput
  | cg.CodeMirrorTypeCreateInput
  | cg.ElementTypeCreateInput
  | cg.EnumTypeCreateInput
  | cg.InterfaceTypeCreateInput
  | cg.LambdaTypeCreateInput
  | cg.PageTypeCreateInput
  | cg.PrimitiveTypeCreateInput
  | cg.ReactNodeTypeCreateInput
  | cg.RenderPropsTypeCreateInput
  | cg.UnionTypeCreateInput

export type IUpdateTypeInput =
  | cg.AppTypeUpdateInput
  | cg.ArrayTypeUpdateInput
  | cg.CodeMirrorTypeUpdateInput
  | cg.ElementTypeUpdateInput
  | cg.EnumTypeUpdateInput
  | cg.InterfaceTypeUpdateInput
  | cg.LambdaTypeUpdateInput
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
  | cg.CodeMirrorTypeConnectInput
  | cg.ElementTypeConnectInput
  | cg.EnumTypeConnectInput
  | cg.InterfaceTypeConnectInput
  | cg.LambdaTypeConnectInput
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
  | cg.CodeMirrorTypeDisconnectInput
  | cg.ElementTypeDisconnectInput
  | cg.EnumTypeDisconnectInput
  | cg.InterfaceTypeDisconnectInput
  | cg.LambdaTypeDisconnectInput
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
  | cg.CodeMirrorTypeDeleteInput
  | cg.ElementTypeDeleteInput
  | cg.EnumTypeDeleteInput
  | cg.InterfaceTypeDeleteInput
  | cg.LambdaTypeDeleteInput
  | cg.PageTypeDeleteInput
  | cg.PrimitiveTypeDeleteInput
  | cg.ReactNodeTypeDeleteInput
  | cg.RenderPropsTypeDeleteInput
  | cg.UnionTypeDeleteInput
