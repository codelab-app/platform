import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsync } from '@react-hookz/web'

export const useTypesTableData = (typeService: ITypeService) => {
  /**
   * Get the base types of the current page
   */
  const [{ result: fetchedTypes, status: loadingAllTypesStatus }, getTypes] =
    useAsync(typeService.getBaseTypes)

  /**
   * Load full details of the types
   */
  const [{ status: loadingFullTypeStatus }, getFullType] = useAsync(
    typeService.getAll,
  )

  return {
    fetchedTypes,
    getFullType,
    getTypes,
    isLoadingAllTypes: loadingAllTypesStatus === 'loading',
    loadingFullType: loadingFullTypeStatus === 'loading',
  }
}
