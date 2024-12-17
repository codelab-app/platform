import type { ITypeUpdateDto } from '@codelab/frontend/abstract/domain'

import { findTypeServerActions } from '@codelab/shared-domain-module/type'

const getInnerTypeIds = (submitData: ITypeUpdateDto) => [
  ...(submitData.unionTypeIds ?? []),
]

const { IsTypeDescendantOf } = findTypeServerActions

// Check if the updated type is not a descendant of any of the inner types
// because this would cause a circular dependency between them and
export const validateNonRecursive = async (
  updateId: string | undefined,
  submitData: ITypeUpdateDto,
) => {
  if (!updateId) {
    throw new Error('Missing type id')
  }

  const innerTypes = getInnerTypeIds(submitData)

  if (innerTypes.length > 0) {
    const results = await Promise.all(
      innerTypes.map((innerTypeId) =>
        IsTypeDescendantOf({
          descendantTypeId: updateId,
          parentTypeId: innerTypeId,
        }),
      ),
    )

    if (results.some((result) => Boolean(result.isTypeDescendantOf))) {
      throw new Error(
        'Cannot update type because it will cause a circular dependency',
      )
    }
  }
}
