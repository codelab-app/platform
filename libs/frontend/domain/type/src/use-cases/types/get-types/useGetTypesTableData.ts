import { BaseTypesOptions, ITypeService } from '@codelab/frontend/abstract/core'
import { useAsyncFn } from 'react-use'

export const useGetTypesTableData = (typeService: ITypeService) => {
  const [{ loading: isLoadingBaseTypes }, _getBaseTypes] = useAsyncFn(
    typeService.getBaseTypes.bind(typeService),
    [],
  )

  const [{ loading: isLoadingTypeDependencies }, getBaseTypeDependencies] =
    useAsyncFn(typeService.getAll.bind(typeService), [])

  const getBaseTypes = async (options: BaseTypesOptions) => {
    await _getBaseTypes(options)
    await getBaseTypeDependencies({
      id_IN: typeService.typesList
        .filter((type) => typeService.entityIdsOfCurrentPage.includes(type.id))
        .map((type) => type.id),
    })
  }

  return {
    isLoadingBaseTypes,
    isLoadingTypeDependencies,
    getBaseTypes,
  }
}
