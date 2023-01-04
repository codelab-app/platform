import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useTypesTableData = (typeService: ITypeService) => {
  typeService.getBaseTypes.bind(typeService)
  typeService.getAll.bind(typeService)

  /**
   * Get the base types of the current page and load the fields and write to cache
   */
  const setupCurrentPageTypes = async (
    options: Parameters<typeof typeService.getBaseTypes>[0],
  ) => {
    const baseTypeIds = await typeService.getBaseTypes(options)
    await typeService.getAll({ id_IN: baseTypeIds })
  }

  const [{ loading: isLoadingAllTypes }, getBaseTypes] = useAsyncFn(
    setupCurrentPageTypes,
  )

  return {
    isLoadingAllTypes,
    getBaseTypes,
  }
}
