import type * as cg from '@codelab/shared/infra/gql'

export interface ITypeUpdateArgs {
  connect?: ITypeConnectInput
  delete?: ITypeDeleteInput
  disconnect?: ITypeDisconnectInput
  update: ITypeUpdateInput
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
  | cg.RichTextType
  | cg.UnionTypeWhere

export type ITypeCreateInput =
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
  | cg.RichTextTypeCreateInput
  | cg.UnionTypeCreateInput

export type ITypeUpdateInput =
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
  | cg.RichTextTypeUpdateInput
  | cg.UnionTypeUpdateInput

/**
 * Connect
 */

export type ITypeConnectInput =
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
  | cg.RichTextTypeConnectInput
  | cg.UnionTypeConnectInput

/**
 * Disconnect
 */
export type ITypeDisconnectInput =
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
  | cg.RichTextTypeDisconnectInput
  | cg.UnionTypeDisconnectInput

/**
 * Delete
 */

export type ITypeDeleteInput =
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
  | cg.RichTextTypeDeleteInput
  | cg.UnionTypeDeleteInput
