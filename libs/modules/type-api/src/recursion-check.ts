import { BaseDgraphFields, instanceOfDgraphModel } from '@codelab/backend'
import { MAX_TYPE_DEPTH } from './constants'
import { OverlyNestedTypeError } from './errors'
import { RecursiveTypeError } from './errors/RecursiveTypeError'
import {
  ArrayTypeDgraphFields,
  DgraphArrayType,
  DgraphFieldFields,
  DgraphInterface,
  DgraphTypeUnion,
  InterfaceDgraphFields,
} from './models'

/**
 * Checks if the id of type A is referenced anywhere, at any depth, inside type B
 *
 * Throws {@link OverlyNestedTypeError} if the type is too nested based on {@link MAX_TYPE_DEPTH}
 * Throws {@link RecursiveTypeError} if typeAId is referenced inside type B
 */
export const checkForRecursion = (typeAId: string, typeB: DgraphTypeUnion) => {
  let itemCheckIteration = 0

  const checkItemTypeForRecursion = (innerType: DgraphTypeUnion) => {
    itemCheckIteration++

    if (itemCheckIteration > MAX_TYPE_DEPTH) {
      throw new OverlyNestedTypeError()
    }

    if (innerType[BaseDgraphFields.uid] === typeAId) {
      throw new RecursiveTypeError()
    }

    if (instanceOfDgraphModel(innerType, DgraphArrayType.Metadata.modelName)) {
      checkItemTypeForRecursion(
        (innerType as DgraphArrayType)[ArrayTypeDgraphFields.Type],
      )
    } else if (
      instanceOfDgraphModel(innerType, DgraphInterface.Metadata.modelName)
    ) {
      ;(innerType as DgraphInterface)[InterfaceDgraphFields.Fields]?.forEach(
        (field) => {
          checkItemTypeForRecursion(field[DgraphFieldFields.Type])
        },
      )
    }
  }

  checkItemTypeForRecursion(typeB)
}
