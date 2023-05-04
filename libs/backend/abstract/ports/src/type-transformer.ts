/* eslint-disable @typescript-eslint/member-ordering */
import type {
  IActionTypeDTO,
  IArrayTypeDTO,
  IAtom,
  IAuth0Owner,
  IEnumTypeDTO,
  IField,
  IPrimitiveTypeDTO,
  IReactNodeTypeDTO,
  IRenderPropTypeDTO,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  atom: Pick<IAtom, 'name'>
  field: Pick<IField, 'key'>
  // owner: IAuth0Owner

  isActionType(type: string): boolean
  actionType(type: string): IActionTypeDTO

  isReactNodeType(type: string): boolean
  reactNodeType(type: string): IReactNodeTypeDTO

  isRenderPropType(type: string): boolean
  renderPropType(type: string): IRenderPropTypeDTO

  isEnumType(type: string): boolean
  enumType(type: string): IEnumTypeDTO

  // arrayType(type: string): IArrayTypeDTO

  isUnionType(type: string): boolean
  unionType(type: string): Promise<IUnionTypeDTO>

  isBooleanType(type: string): boolean
  booleanType(type: string): IPrimitiveTypeDTO

  isStringType(type: string): boolean
  stringType(type: string): IPrimitiveTypeDTO

  isNumberType(type: string): boolean
  numberType(type: string): IPrimitiveTypeDTO

  isIntegerType(type: string): boolean
  integerType(type: string): IPrimitiveTypeDTO
}
