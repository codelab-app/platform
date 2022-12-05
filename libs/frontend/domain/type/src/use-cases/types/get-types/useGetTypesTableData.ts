import { ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useGetTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingBaseTypes }, getBaseTypesOfPage] = useAsyncFn(
    typeService.getBaseTypesOfPage.bind(typeService),
    [],
  )

  const [{ loading: isLoadingTypeDependencies }, getBaseTypeDependencies] =
    useAsyncFn(typeService.getAll.bind(typeService), [])

  const changePage = async (page: number, pageSize: number) => {
    await getBaseTypesOfPage(page, pageSize)
    await getBaseTypeDependencies({
      id_IN: typeService.entityIdsOfcurrentLoadedPage,
    })
  }

  return {
    isLoadingBaseTypes,
    isLoadingTypeDependencies,
    changePage,
  }
}
