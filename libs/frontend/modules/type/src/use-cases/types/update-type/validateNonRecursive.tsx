import { IUpdateTypeDTO } from '@codelab/shared/abstract/core'
import { typeApi } from '../../../store'
import { UpdateTypeSchema } from './update-type.schema'

const getInnerTypeIds = (submitData: UpdateTypeSchema) => [
  ...(submitData.typeIdsOfUnionType ?? []),
]

// Check if the updated type is not a descendant of any of the inner types
// because this would cause a circular dependency between them and
export const validateNonRecursive = async (
  updateId: string,
  submitData: UpdateTypeSchema,
) => {
  const innerTypes = getInnerTypeIds(submitData)

  if (innerTypes.length > 0) {
    const results = await Promise.all(
      innerTypes.map((innerTypeId) =>
        typeApi.IsTypeDescendantOf({
          descendantTypeId: updateId,
          parentTypeId: innerTypeId,
        }),
      ),
    )

    if (results.some((result) => !!result?.isTypeDescendantOf)) {
      throw new Error(
        'Cannot update type because it will cause a circular dependency',
      )
    }
  }
}
