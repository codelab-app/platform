/* eslint-disable @typescript-eslint/member-ordering */
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IAtomDTO, IFieldDTO } from '@codelab/shared/abstract/core'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  atom: Pick<IAtomDTO, 'name'>
  field: Pick<IFieldDTO, 'key'>

  isActionType(type: string): boolean
  actionType(type: string): Promise<OGM_TYPES.ActionType>

  isReactNodeType(type: string): boolean
  reactNodeType(type: string): Promise<OGM_TYPES.ReactNodeType>

  isRenderPropType(type: string): boolean
  renderPropType(type: string): Promise<OGM_TYPES.RenderPropType>

  isEnumType(type: string): boolean
  enumType(type: string): Promise<OGM_TYPES.EnumType>

  // arrayType(type: string): IArrayTypeDTO

  isUnionType(type: string): boolean
  unionType(type: string): Promise<OGM_TYPES.UnionType>

  isBooleanType(type: string): boolean
  booleanType(type: string): Promise<OGM_TYPES.PrimitiveType>

  isStringType(type: string): boolean
  stringType(type: string): Promise<OGM_TYPES.PrimitiveType>

  isNumberType(type: string): boolean
  numberType(type: string): Promise<OGM_TYPES.PrimitiveType>

  isIntegerType(type: string): boolean
  integerType(type: string): Promise<OGM_TYPES.PrimitiveType>
}
