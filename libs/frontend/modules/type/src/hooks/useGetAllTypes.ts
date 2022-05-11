import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { ITypeService } from '@codelab/shared/abstract/core'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const useGetAllTypesQuery = (
  ids: Array<string> | undefined,
  types: ITypeService,
) => {
  const [getTypes, { data, isLoading, error }] = useStatefulExecutor(
    (_ids: Array<string> | undefined) => types.getAll({ id_IN: _ids }),
  )

  useDeepCompareEffect(() => {
    getTypes(ids)
  }, [ids ?? []])

  return { data: data ? types.typesList : null, isLoading, error }
}
