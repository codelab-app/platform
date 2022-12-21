import type { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingAllTypes, value }, getAllTypes] = useAsyncFn(
    typeService.getAll.bind(typeService),
    [],
  )

  return {
    value,
    isLoadingAllTypes,
    getAllTypes,
  }
}
