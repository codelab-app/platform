import { useGetTypeKindsQuery } from '@codelab/frontend/modules/type'
import { notify } from '@codelab/frontend/shared/utils'
import { IType } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { entityRecordById } from '@codelab/shared/utils'
import { useEffect, useMemo } from 'react'

export type TypeKindsById = Record<string, IType>

export const useTypesByIdQuery = () => {
  const typeKindsQuery = useGetTypeKindsQuery()

  const typesById = useMemo<Maybe<TypeKindsById>>(() => {
    if (!typeKindsQuery.data) {
      return undefined
    }

    return entityRecordById<IType>(
      typeKindsQuery.data.getTypes as any as Array<IType>,
    )
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
