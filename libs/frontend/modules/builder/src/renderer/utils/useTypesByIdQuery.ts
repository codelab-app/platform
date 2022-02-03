import {
  TypeBaseFragment,
  useGetAllTypesQuery,
} from '@codelab/frontend/modules/type'
import { notify } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { entityRecordById } from '@codelab/shared/utils'
import { useEffect, useMemo } from 'react'

export type TypeKindsById = Record<string, TypeBaseFragment>

export const useTypesByIdQuery = () => {
  const typeKindsQuery = useGetAllTypesQuery()

  const typesById = useMemo<Maybe<TypeKindsById>>(() => {
    if (!typeKindsQuery.data) {
      return undefined
    }

    return entityRecordById(typeKindsQuery.data.types)
  }, [typeKindsQuery])

  useEffect(() => {
    if (typeKindsQuery.error && !typeKindsQuery.isLoading) {
      notify({
        title: 'Error while getting types',
        content: (typeKindsQuery.error as any)?.message,
        type: 'error',
      })
    }
  }, [typeKindsQuery])

  return { typesById, typeKindsQuery }
}
