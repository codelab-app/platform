import { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useGetTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingBaseTypes }, getPaginationData] = useAsyncFn(
    typeService.getPaginationData.bind(typeService),
    [],
  )

  const [{ loading: isloadingTypeDependencies }, getBaseTypeDepdencies] =
    useAsyncFn(typeService.getAll.bind(typeService), [])

  const changePage = async (page: number, pageSize: number) => {
    await getPaginationData(page, pageSize)
    await getBaseTypeDepdencies({ id_IN: typeService.entityIdsOfCurrentPage })
  }

  return {
    isLoadingBaseTypes,
    isloadingTypeDependencies,
    changePage,
  }
}
