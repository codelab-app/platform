import { Type } from '@codelab/frontend/abstract/codegen'
import { notify } from '@codelab/frontend/shared/utils'
import React, { useEffect } from 'react'
import { useGetTypeKindsQuery } from '../../../store/typeEndpoints'

export interface TypeKindsContextType {
  typeKinds?: Array<Pick<Type, 'id' | 'typeKind'> & { __typename: string }>
}

const defaultContext: TypeKindsContextType = {}

export const TypeKindsContext = React.createContext(defaultContext)

const useTypeKindsProviderQueries = () => {
  const typeKindsQuery = useGetTypeKindsQuery()

  useEffect(() => {
    if (typeKindsQuery.error && !typeKindsQuery.isLoading) {
      notify({
        title: 'Error while getting interface',
        content: (typeKindsQuery.error as any)?.message,
        type: 'error',
      })
    }
  }, [typeKindsQuery])

  return { typeKindsQuery }
}

export const TypeKindProvider = ({
  children,
}: React.PropsWithChildren<any>) => {
  const { typeKindsQuery } = useTypeKindsProviderQueries()

  if (!typeKindsQuery.data || !typeKindsQuery.data.getTypes) {
    return null
  }

  return (
    <TypeKindsContext.Provider
      value={{
        typeKinds: typeKindsQuery.data.getTypes,
      }}
    >
      {children}
    </TypeKindsContext.Provider>
  )
}

TypeKindProvider.displayName = 'TypeKindProvider'
