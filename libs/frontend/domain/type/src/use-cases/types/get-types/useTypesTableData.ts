import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useTypesTableData = (typeService: ITypeService) => {
  /**
   * Get the base types of the current page
   */
  const [{ loading: isLoadingAllTypes, value: fetchedTypes }, getTypes] =
    useAsyncFn(typeService.getBaseTypes)

  /**
   * Load full details of the types
   */
  const [{ loading: loadingFullType }, getFullType] = useAsyncFn(
    typeService.getAll,
  )

  return {
    fetchedTypes,
    getFullType,
    getTypes,
    isLoadingAllTypes,
    loadingFullType,
  }
}
