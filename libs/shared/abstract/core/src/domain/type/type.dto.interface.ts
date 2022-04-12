import {
  ElementTypeKind,
  MonacoLanguage,
  PrimitiveTypeKind,
} from '@codelab/shared/abstract/codegen'
import * as cg from '@codelab/shared/abstract/codegen'
import { TypeKind } from './types/base-type/type-kind.enum'
import { IEnumTypeValue } from './types/enum-type/enum-type.interface'

export interface IBaseTypeDTO {
  name: string
  primitiveKind?: PrimitiveTypeKind
  elementKind?: ElementTypeKind
  language?: MonacoLanguage
  allowedValues?: Array<IEnumTypeValue>
  typeIdsOfUnionType?: Array<string>
}

/**
 * Create
 */
export interface ICreateTypeDTO extends IBaseTypeDTO {
  kind: TypeKind
  typeIdsOfUnionType?: Array<string>
  arrayItemTypeId?: string
  typesOfUnionType?: string
}

export interface IUpdateTypeArgs {
  update: IUpdateTypeInput
  disconnect?: IDisconnectTypeInput
  connect?: IConnectTypeInput
  delete?: IDeleteTypeInput
}

export type ICreateTypeInput =
  | cg.AppTypeCreateInput
  | cg.ArrayTypeCreateInput
  | cg.ElementTypeCreateInput
  | cg.EnumTypeCreateInput
  | cg.InterfaceTypeCreateInput
  | cg.LambdaTypeCreateInput
  | cg.MonacoTypeCreateInput
  | cg.PageTypeCreateInput
  | cg.PrimitiveTypeCreateInput
  | cg.ReactNodeTypeCreateInput
  | cg.RenderPropsTypeCreateInput
  | cg.UnionTypeCreateInput

/**
 * Update
 */
export type IUpdateTypeDTO = IBaseTypeDTO

export type IUpdateTypeInput =
  | cg.AppTypeUpdateInput
  | cg.ArrayTypeUpdateInput
  | cg.ElementTypeUpdateInput
  | cg.EnumTypeUpdateInput
  | cg.InterfaceTypeUpdateInput
  | cg.LambdaTypeUpdateInput
  | cg.MonacoTypeUpdateInput
  | cg.PageTypeUpdateInput
  | cg.PrimitiveTypeUpdateInput
  | cg.ReactNodeTypeUpdateInput
  | cg.RenderPropsTypeUpdateInput
  | cg.UnionTypeUpdateInput

/**
 * Connect
 */

export type IConnectTypeInput =
  | cg.AppTypeConnectInput
  | cg.ArrayTypeConnectInput
  | cg.ElementTypeConnectInput
  | cg.EnumTypeConnectInput
  | cg.InterfaceTypeConnectInput
  | cg.LambdaTypeConnectInput
  | cg.MonacoTypeConnectInput
  | cg.PageTypeConnectInput
  | cg.PrimitiveTypeConnectInput
  | cg.ReactNodeTypeConnectInput
  | cg.RenderPropsTypeConnectInput
  | cg.UnionTypeConnectInput

/**
 * Disconnect
 */
export type IDisconnectTypeInput =
  | cg.AppTypeDisconnectInput
  | cg.ArrayTypeDisconnectInput
  | cg.ElementTypeDisconnectInput
  | cg.EnumTypeDisconnectInput
  | cg.InterfaceTypeDisconnectInput
  | cg.LambdaTypeDisconnectInput
  | cg.MonacoTypeDisconnectInput
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
  | cg.MonacoTypeDeleteInput
  | cg.PageTypeDeleteInput
  | cg.PrimitiveTypeDeleteInput
  | cg.ReactNodeTypeDeleteInput
  | cg.RenderPropsTypeDeleteInput
  | cg.UnionTypeDeleteInput
