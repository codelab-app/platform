import type { Callback } from '@codelab/shared/abstract/types'

/**
 * Usage
 *
 *   const typename = getEnumValue(
      IElementRenderTypeKind,
      transformedValue.$modelType,
      (type) => {
        if (type === '@codelab/AtomRef') {
          return IElementRenderTypeKind.Atom
        }

        if (type === '@codelab/ComponentRef') {
          return IElementRenderTypeKind.Component
        }

        throw new Error('$modelType not found')
      },
    )
 */
export const getEnumValue = <
  T extends Record<string, string>,
  K extends keyof T,
>(
  enumObj: T,
  value: string,
  mapper: Callback<string, T[K]> = (val) => val as T[K],
): T[K] => {
  const mappedValue = mapper(value)

  if (!Object.values(enumObj).includes(mappedValue)) {
    throw new Error(`Invalid enum value: ${value.toString()}`)
  }

  return mappedValue
}
