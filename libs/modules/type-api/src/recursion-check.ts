import { BaseDgraphFields, instanceOfDgraphModel } from '@codelab/backend'
import { MAX_TYPE_DEPTH } from './constants'
import {
  ArrayTypeDgraphFields,
  DgraphArrayType,
  DgraphInterface,
  DgraphTypeUnion,
  FieldDgraphFields,
  InterfaceDgraphFields,
} from './models'

export const checkForRecursion = (
  existingTypeId: string,
  itemType: DgraphTypeUnion,
) => {
  let itemCheckIteration = 0

  const checkItemTypeForRecursion = (innerType: DgraphTypeUnion) => {
    itemCheckIteration++

    if (itemCheckIteration > MAX_TYPE_DEPTH) {
      throw new Error('Type too nested')
    }

    if (innerType[BaseDgraphFields.uid] === existingTypeId) {
      throw new Error('Cannot create self-referencing type')
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
          checkItemTypeForRecursion(field[FieldDgraphFields.Type])
        },
      )
    }
  }

  checkItemTypeForRecursion(itemType)
}
