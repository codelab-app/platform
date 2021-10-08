import { Type, TypeKind } from '@codelab/frontend/abstract/codegen'
import { notify } from '@codelab/frontend/shared/utils'
import React, { useEffect, useMemo } from 'react'
import { useGetTypeKindsQuery } from '../get-type-kinds'

export interface TypeKindsContextType {
  typeKindsById: Record<string, TypeKind>
  typeKinds?: Array<Pick<Type, 'id' | 'typeKind'> & { __typename: string }>
}

const defaultContext: TypeKindsContextType = {
  typeKindsById: {},
}

export const TypeKindsContext = React.createContext(defaultContext)

const useTypeKindsProviderQueries = () => {
  const typeKindsQuery = useGetTypeKindsQuery()

  const typeKindsById = useMemo<TypeKindsContextType['typeKindsById']>(() => {
    if (!typeKindsQuery.data?.getTypes) {
      return {}
    }

    return typeKindsQuery.data.getTypes.reduce<
      TypeKindsContextType['typeKindsById']
    >((map, type) => {
      map[type.id] = type.typeKind

      return map
    }, {})
  }, [typeKindsQuery])

  useEffect(() => {
    if (typeKindsQuery.error && !typeKindsQuery.loading) {
      notify({
        title: 'Error while getting interface',
        content: typeKindsQuery.error?.message,
        type: 'error',
      })
    }
  }, [typeKindsQuery])

  return { typeKindsById, typeKindsQuery }
}

export const TypeKindProvider = ({
  children,
}: React.PropsWithChildren<any>) => {
  const { typeKindsById, typeKindsQuery } = useTypeKindsProviderQueries()

  if (!typeKindsQuery.data || !typeKindsQuery.data.getTypes) {
    return null
  }

  return (
    <TypeKindsContext.Provider
      value={{
        typeKindsById,
        typeKinds: typeKindsQuery.data.getTypes,
      }}
    >
      {children}
    </TypeKindsContext.Provider>
  )
}

TypeKindProvider.displayName = 'TypeKindProvider'
