import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingAllTypes }, getAllTypes] = useAsyncFn(
    typeService.getAll.bind(typeService),
    [],
  )

  return {
    isLoadingAllTypes,
    getAllTypes,
  }
}
