import { TypeKind } from '../types/base-type/type-kind.enum'

/**
 * All types that result in a value with shape of {@see TypedValue}
 */
export const typedValueTypes = new Set([
  TypeKind.ElementType,
  TypeKind.RenderPropsType,
  TypeKind.ReactNodeType,
  TypeKind.UnionType,
])

export const isTypedValueType = (type: TypeKind): boolean =>
  typedValueTypes.has(type)
