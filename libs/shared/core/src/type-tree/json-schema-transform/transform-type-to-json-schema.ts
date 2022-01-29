import { IType } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from './shared/types'
import { typeTransformers } from './type-transformers'

/**
 * Transforms an {@link IType} to a json schema property object
 * or throws an error if the type is not recognized.
 *
 * It does not handle any relationships between types, just flat types properties.
 * Use TypeTree.toJsonSchema() to handle relationships.
 *
 * @param type The type used to generate the property, doesn't have to be the field's type
 * @param options Customization options
 */
export const transformTypeToJsonSchema: TypeTransformFn = (
  type: IType,
  options,
): Record<string, any> => {
  const transformer = typeTransformers[type.typeKind] as TypeTransformFn // cast to generic IType transformer

  if (!transformer) {
    throw new Error(`Type not recognized ${type.typeKind}`)
  }

  return transformer(type, options)
}
