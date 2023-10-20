import type * as cg from '@codelab/shared/abstract/codegen'

export interface IUpdateTypeArgs {
  connect?: IConnectNodeInput
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
  | cg.RenderPropTypeWhere
  | cg.UnionTypeWhere

export type IUpdateTypeVars =
  | cg.UpdateActionTypesMutationVariables
  | cg.UpdateAppTypesMutationVariables
  | cg.UpdateArrayTypesMutationVariables
  | cg.UpdateCodeMirrorTypesMutationVariables
  | cg.UpdateElementTypesMutationVariables
  | cg.UpdateEnumTypesMutationVariables
  | cg.UpdateInterfaceTypesMutationVariables
  | cg.UpdateLambdaTypesMutationVariables
  | cg.UpdatePageTypesMutationVariables
  | cg.UpdatePrimitiveTypesMutationVariables
  | cg.UpdateReactNodeTypesMutationVariables
  | cg.UpdateRenderPropTypesMutationVariables
  | cg.UpdateUnionTypesMutationVariables

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
  | cg.RenderPropTypeCreateInput
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
  | cg.RenderPropTypeUpdateInput
  | cg.UnionTypeUpdateInput

/**
 * Connect
 */

export type IConnectNodeInput =
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
  | cg.RenderPropTypeConnectInput
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
  | cg.RenderPropTypeDisconnectInput
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
  | cg.RenderPropTypeDeleteInput
  | cg.UnionTypeDeleteInput
