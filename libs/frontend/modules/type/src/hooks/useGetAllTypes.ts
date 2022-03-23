import { useAsyncState } from '@codelab/frontend/shared/utils'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { TypeService } from '../store'

export const useGetAllTypesQuery = (
  ids: Array<string> | undefined,
  types: TypeService,
) => {
  const [getTypes, { data, isLoading, error }] = useAsyncState(
    (_ids: Array<string> | undefined) => types.getAll(_ids),
  )

  useDeepCompareEffect(() => {
    getTypes(ids)
  }, [ids ?? []])

  return { data: data ? types.typesList : null, isLoading, error }
}
