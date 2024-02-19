import type {
  ActionType,
  EnumType,
  PrimitiveType,
  ReactNodeType,
  RenderPropType,
  UnionType,
} from '@codelab/backend/abstract/codegen'
import type { IAtomDto, IFieldDto } from '@codelab/shared/abstract/core'

/**
 * Allows transformation of any framework types to the core types
 */
export interface ITypeTransformer {
  actionType(type: string): Promise<ActionType>
  booleanType(type: string): Promise<PrimitiveType>
  enumType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<EnumType>
  integerType(type: string): Promise<PrimitiveType>
  numberType(type: string): Promise<PrimitiveType>
  reactNodeType(type: string): Promise<ReactNodeType>
  renderPropType(type: string): Promise<RenderPropType>
  stringType(type: string): Promise<PrimitiveType>
  unionType(
    type: string,
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ): Promise<UnionType>
}
