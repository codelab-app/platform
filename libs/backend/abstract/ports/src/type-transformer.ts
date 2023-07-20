/* eslint-disable @typescript-eslint/member-ordering */
import type {
  ActionType,
  ArrayType,
  EnumType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  UnionType,
} from '@codelab/backend/abstract/codegen'
import type { IAtomDTO, IFieldDTO } from '@codelab/shared/abstract/core'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  atom: Pick<IAtomDTO, 'name'>
  field: Pick<IFieldDTO, 'key'>

  isActionType(type: string): boolean
  actionType(type: string): Promise<ActionType>

  isReactNodeType(type: string): boolean
  reactNodeType(type: string): Promise<ReactNodeType>

  isRenderPropType(type: string): boolean
  renderPropType(type: string): Promise<RenderPropType>

  isEnumType(type: string): boolean
  enumType(type: string): Promise<EnumType>

  isArrayType(type: string): boolean
  // arrayType(type: string): Promise<ArrayType>

  isUnionType(type: string): boolean
  unionType(type: string): Promise<UnionType>

  isBooleanType(type: string): boolean
  booleanType(type: string): Promise<PrimitiveType>

  isStringType(type: string): boolean
  stringType(type: string): Promise<PrimitiveType>

  isNumberType(type: string): boolean
  numberType(type: string): Promise<PrimitiveType>

  isIntegerType(type: string): boolean
  integerType(type: string): Promise<PrimitiveType>
}
