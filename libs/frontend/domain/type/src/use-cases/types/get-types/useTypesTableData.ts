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

    return await typeService.getAll({ id_IN: baseTypeIds })
  }

  const [
    { loading: isLoadingAllTypes, value: fetchedBaseTypes },
    getBaseTypes,
  ] = useAsyncFn(setupCurrentPageTypes)

  const [{ loading: isLoadingTypeDescendants }, getTypeDescendants] =
    useAsyncFn(async (id: string) => {
      await typeService.getAllWithDescendants([id])
    })

  return {
    fetchedBaseTypes,
    getBaseTypes,
    getTypeDescendants,
    isLoadingAllTypes,
    isLoadingTypeDescendants,
  }
}
