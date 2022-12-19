import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useGetTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingAllTypes }, getAllTypes] = useAsyncFn(
    typeService.getAll.bind(typeService),
    [],
  )

  return {
    isLoadingAllTypes,
    getAllTypes,
  }
}
