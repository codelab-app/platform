import type {
  IActionTypeDto,
  IAppTypeDto,
  IArrayTypeDto,
  ICodeMirrorTypeDto,
  IElementTypeDto,
  IEnumTypeDto,
  IInterfaceTypeDto,
  ILambdaTypeDto,
  IPageTypeDto,
  IPrimitiveTypeDto,
  IReactNodeTypeDto,
  IRenderPropTypeDto,
  IRichTextTypeDto,
  ITypeKind,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'
import type * as cg from '@codelab/shared/infra/gql'

export interface ITypeUpdateArgs {
  connect?: ITypeConnectInput
  delete?: ITypeDeleteInput
  disconnect?: ITypeDisconnectInput
  update: ITypeUpdateInput
  where: ITypeWhere
}

export type ITypeWhere =
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
  | cg.ActionTypeUpdateInput
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

export type ITypeUpdateVars =
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
  | cg.UpdateRichTextTypesMutationVariables
  | cg.UpdateUnionTypesMutationVariables

/**
 * Connect
 */

export type ITypeConnectInput =
  | cg.ActionTypeConnectInput
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
  | cg.ActionTypeDisconnectInput
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
  | cg.ActionTypeDeleteInput
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

/**
 * Type mapping for different types
 */
export interface TypeCreateMap {
  [ITypeKind.ActionType]: { dto: IActionTypeDto; where: cg.ActionTypeWhere }
  [ITypeKind.AppType]: { dto: IAppTypeDto; where: cg.AppTypeWhere }
  [ITypeKind.ArrayType]: { dto: IArrayTypeDto; where: cg.ArrayTypeWhere }
  [ITypeKind.CodeMirrorType]: {
    dto: ICodeMirrorTypeDto
    where: cg.CodeMirrorTypeWhere
  }
  [ITypeKind.ElementType]: { dto: IElementTypeDto; where: cg.ElementTypeWhere }
  [ITypeKind.EnumType]: { dto: IEnumTypeDto; where: cg.EnumTypeWhere }
  [ITypeKind.InterfaceType]: {
    dto: IInterfaceTypeDto
    where: cg.InterfaceTypeWhere
  }
  [ITypeKind.LambdaType]: { dto: ILambdaTypeDto; where: cg.LambdaTypeWhere }
  [ITypeKind.PageType]: { dto: IPageTypeDto; where: cg.PageTypeWhere }
  [ITypeKind.PrimitiveType]: {
    dto: IPrimitiveTypeDto
    where: cg.PrimitiveTypeWhere
  }
  [ITypeKind.ReactNodeType]: {
    dto: IReactNodeTypeDto
    where: cg.ReactNodeTypeWhere
  }
  [ITypeKind.RenderPropType]: {
    dto: IRenderPropTypeDto
    where: cg.RenderPropTypeWhere
  }
  [ITypeKind.RichTextType]: {
    dto: IRichTextTypeDto
    where: cg.RichTextTypeWhere
  }
  [ITypeKind.UnionType]: { dto: IUnionTypeDto; where: cg.UnionTypeWhere }
}
