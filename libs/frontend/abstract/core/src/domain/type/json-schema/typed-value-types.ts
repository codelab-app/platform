import { ITypeKind } from '@codelab/shared/abstract/core'

/**
 * All types that result in a value with shape of {@see TypedValue}
 */
export const typedValueTypes: Set<ITypeKind> = new Set([
  ITypeKind.ElementType,
  ITypeKind.RenderPropsType,
  ITypeKind.ReactNodeType,
  ITypeKind.UnionType,
])

export const isTypedValueType = (type: ITypeKind): boolean =>
  typedValueTypes.has(type)
