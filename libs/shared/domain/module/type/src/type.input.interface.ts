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
} from '@codelab/shared-abstract-core'
import type {
  ActionTypeConnectInput,
  ActionTypeCreateInput,
  ActionTypeDeleteInput,
  ActionTypeDisconnectInput,
  ActionTypeUpdateInput,
  ActionTypeWhere,
  AppTypeConnectInput,
  AppTypeCreateInput,
  AppTypeDeleteInput,
  AppTypeDisconnectInput,
  AppTypeUpdateInput,
  AppTypeWhere,
  ArrayTypeConnectInput,
  ArrayTypeCreateInput,
  ArrayTypeDeleteInput,
  ArrayTypeDisconnectInput,
  ArrayTypeUpdateInput,
  ArrayTypeWhere,
  CodeMirrorTypeConnectInput,
  CodeMirrorTypeCreateInput,
  CodeMirrorTypeDeleteInput,
  CodeMirrorTypeDisconnectInput,
  CodeMirrorTypeUpdateInput,
  CodeMirrorTypeWhere,
  ElementTypeConnectInput,
  ElementTypeCreateInput,
  ElementTypeDeleteInput,
  ElementTypeDisconnectInput,
  ElementTypeUpdateInput,
  ElementTypeWhere,
  EnumTypeConnectInput,
  EnumTypeCreateInput,
  EnumTypeDeleteInput,
  EnumTypeDisconnectInput,
  EnumTypeUpdateInput,
  EnumTypeWhere,
  InterfaceTypeConnectInput,
  InterfaceTypeCreateInput,
  InterfaceTypeDeleteInput,
  InterfaceTypeDisconnectInput,
  InterfaceTypeUpdateInput,
  InterfaceTypeWhere,
  LambdaTypeConnectInput,
  LambdaTypeCreateInput,
  LambdaTypeDeleteInput,
  LambdaTypeDisconnectInput,
  LambdaTypeUpdateInput,
  LambdaTypeWhere,
  PageTypeConnectInput,
  PageTypeCreateInput,
  PageTypeDeleteInput,
  PageTypeDisconnectInput,
  PageTypeUpdateInput,
  PageTypeWhere,
  PrimitiveTypeConnectInput,
  PrimitiveTypeCreateInput,
  PrimitiveTypeDeleteInput,
  PrimitiveTypeDisconnectInput,
  PrimitiveTypeUpdateInput,
  PrimitiveTypeWhere,
  ReactNodeTypeConnectInput,
  ReactNodeTypeCreateInput,
  ReactNodeTypeDeleteInput,
  ReactNodeTypeDisconnectInput,
  ReactNodeTypeUpdateInput,
  ReactNodeTypeWhere,
  RenderPropTypeConnectInput,
  RenderPropTypeCreateInput,
  RenderPropTypeDeleteInput,
  RenderPropTypeDisconnectInput,
  RenderPropTypeUpdateInput,
  RenderPropTypeWhere,
  RichTextType,
  RichTextTypeConnectInput,
  RichTextTypeCreateInput,
  RichTextTypeDeleteInput,
  RichTextTypeDisconnectInput,
  RichTextTypeUpdateInput,
  RichTextTypeWhere,
  UnionTypeConnectInput,
  UnionTypeCreateInput,
  UnionTypeDeleteInput,
  UnionTypeDisconnectInput,
  UnionTypeUpdateInput,
  UnionTypeWhere,
  UpdateActionTypesMutationVariables,
  UpdateAppTypesMutationVariables,
  UpdateArrayTypesMutationVariables,
  UpdateCodeMirrorTypesMutationVariables,
  UpdateElementTypesMutationVariables,
  UpdateEnumTypesMutationVariables,
  UpdateInterfaceTypesMutationVariables,
  UpdateLambdaTypesMutationVariables,
  UpdatePageTypesMutationVariables,
  UpdatePrimitiveTypesMutationVariables,
  UpdateReactNodeTypesMutationVariables,
  UpdateRenderPropTypesMutationVariables,
  UpdateRichTextTypesMutationVariables,
  UpdateUnionTypesMutationVariables,
} from '@codelab/shared-infra-gqlgen'

export interface ITypeUpdateArgs {
  connect?: ITypeConnectInput
  delete?: ITypeDeleteInput
  disconnect?: ITypeDisconnectInput
  update: ITypeUpdateInput
  where: ITypeWhere
}

export type ITypeWhere =
  | ActionTypeWhere
  | AppTypeWhere
  | ArrayTypeWhere
  | CodeMirrorTypeWhere
  | ElementTypeWhere
  | EnumTypeWhere
  | InterfaceTypeWhere
  | LambdaTypeWhere
  | PageTypeWhere
  | PrimitiveTypeWhere
  | ReactNodeTypeWhere
  | RenderPropTypeWhere
  | RichTextType
  | UnionTypeWhere

export type ITypeCreateInput =
  | ActionTypeCreateInput
  | AppTypeCreateInput
  | ArrayTypeCreateInput
  | CodeMirrorTypeCreateInput
  | ElementTypeCreateInput
  | EnumTypeCreateInput
  | InterfaceTypeCreateInput
  | LambdaTypeCreateInput
  | PageTypeCreateInput
  | PrimitiveTypeCreateInput
  | ReactNodeTypeCreateInput
  | RenderPropTypeCreateInput
  | RichTextTypeCreateInput
  | UnionTypeCreateInput

export type ITypeUpdateInput =
  | ActionTypeUpdateInput
  | AppTypeUpdateInput
  | ArrayTypeUpdateInput
  | CodeMirrorTypeUpdateInput
  | ElementTypeUpdateInput
  | EnumTypeUpdateInput
  | InterfaceTypeUpdateInput
  | LambdaTypeUpdateInput
  | PageTypeUpdateInput
  | PrimitiveTypeUpdateInput
  | ReactNodeTypeUpdateInput
  | RenderPropTypeUpdateInput
  | RichTextTypeUpdateInput
  | UnionTypeUpdateInput

export type ITypeUpdateVars =
  | UpdateActionTypesMutationVariables
  | UpdateAppTypesMutationVariables
  | UpdateArrayTypesMutationVariables
  | UpdateCodeMirrorTypesMutationVariables
  | UpdateElementTypesMutationVariables
  | UpdateEnumTypesMutationVariables
  | UpdateInterfaceTypesMutationVariables
  | UpdateLambdaTypesMutationVariables
  | UpdatePageTypesMutationVariables
  | UpdatePrimitiveTypesMutationVariables
  | UpdateReactNodeTypesMutationVariables
  | UpdateRenderPropTypesMutationVariables
  | UpdateRichTextTypesMutationVariables
  | UpdateUnionTypesMutationVariables

/**
 * Connect
 */

export type ITypeConnectInput =
  | ActionTypeConnectInput
  | AppTypeConnectInput
  | ArrayTypeConnectInput
  | CodeMirrorTypeConnectInput
  | ElementTypeConnectInput
  | EnumTypeConnectInput
  | InterfaceTypeConnectInput
  | LambdaTypeConnectInput
  | PageTypeConnectInput
  | PrimitiveTypeConnectInput
  | ReactNodeTypeConnectInput
  | RenderPropTypeConnectInput
  | RichTextTypeConnectInput
  | UnionTypeConnectInput

/**
 * Disconnect
 */
export type ITypeDisconnectInput =
  | ActionTypeDisconnectInput
  | AppTypeDisconnectInput
  | ArrayTypeDisconnectInput
  | CodeMirrorTypeDisconnectInput
  | ElementTypeDisconnectInput
  | EnumTypeDisconnectInput
  | InterfaceTypeDisconnectInput
  | LambdaTypeDisconnectInput
  | PageTypeDisconnectInput
  | PrimitiveTypeDisconnectInput
  | ReactNodeTypeDisconnectInput
  | RenderPropTypeDisconnectInput
  | RichTextTypeDisconnectInput
  | UnionTypeDisconnectInput

/**
 * Delete
 */

export type ITypeDeleteInput =
  | ActionTypeDeleteInput
  | AppTypeDeleteInput
  | ArrayTypeDeleteInput
  | CodeMirrorTypeDeleteInput
  | ElementTypeDeleteInput
  | EnumTypeDeleteInput
  | InterfaceTypeDeleteInput
  | LambdaTypeDeleteInput
  | PageTypeDeleteInput
  | PrimitiveTypeDeleteInput
  | ReactNodeTypeDeleteInput
  | RenderPropTypeDeleteInput
  | RichTextTypeDeleteInput
  | UnionTypeDeleteInput

/**
 * Type mapping for different types
 */
export interface TypeCreateMap {
  [ITypeKind.ActionType]: { dto: IActionTypeDto; where: ActionTypeWhere }
  [ITypeKind.AppType]: { dto: IAppTypeDto; where: AppTypeWhere }
  [ITypeKind.ArrayType]: { dto: IArrayTypeDto; where: ArrayTypeWhere }
  [ITypeKind.CodeMirrorType]: {
    dto: ICodeMirrorTypeDto
    where: CodeMirrorTypeWhere
  }
  [ITypeKind.ElementType]: { dto: IElementTypeDto; where: ElementTypeWhere }
  [ITypeKind.EnumType]: { dto: IEnumTypeDto; where: EnumTypeWhere }
  [ITypeKind.InterfaceType]: {
    dto: IInterfaceTypeDto
    where: InterfaceTypeWhere
  }
  [ITypeKind.LambdaType]: { dto: ILambdaTypeDto; where: LambdaTypeWhere }
  [ITypeKind.PageType]: { dto: IPageTypeDto; where: PageTypeWhere }
  [ITypeKind.PrimitiveType]: {
    dto: IPrimitiveTypeDto
    where: PrimitiveTypeWhere
  }
  [ITypeKind.ReactNodeType]: {
    dto: IReactNodeTypeDto
    where: ReactNodeTypeWhere
  }
  [ITypeKind.RenderPropType]: {
    dto: IRenderPropTypeDto
    where: RenderPropTypeWhere
  }
  [ITypeKind.RichTextType]: {
    dto: IRichTextTypeDto
    where: RichTextTypeWhere
  }
  [ITypeKind.UnionType]: { dto: IUnionTypeDto; where: UnionTypeWhere }
}
