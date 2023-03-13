import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useTypesTableData = (typeService: ITypeService) => {
  /**
   * Get the base types of the current page and load the fields and write to cache
   */
  const setupCurrentPageTypes = async (
    options: Parameters<typeof typeService.getBaseTypes>[0],
  ) => {
    const baseTypeIds = await typeService.getBaseTypes(options)

    return await typeService.getAll(baseTypeIds)
  }

  const [{ loading: isLoadingAllTypes, value: fetchedTypes }, getTypes] =
    useAsyncFn(setupCurrentPageTypes)

  return {
    fetchedTypes,
    getTypes,
    isLoadingAllTypes,
  }
}
