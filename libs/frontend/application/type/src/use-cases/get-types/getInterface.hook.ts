'use client'

import type { ITypeService } from '@codelab/frontend/abstract/application'
import type { IInterfaceTypeModel } from '@codelab/frontend/abstract/domain'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'

export const useCurrentInterfaceId = () => {
  const { interfaceId } = useUrlPathParams()

  if (!interfaceId) {
    throw new Error(
      'useGetCurrentInterface: No interfaceId found in query params',
    )
  }

  return interfaceId
}

/** Grabs the [interfaceId] from the query params and fetches it, along with its fields */
export const useGetCurrentInterfaceWithFields = (typeService: ITypeService) => {
  const interfaceId = useCurrentInterfaceId()
  const { typeDomainService } = useDomainStore()

  const [state, getInterface] = useAsyncFn(() =>
    // We need the whole graph, not just the interface, because we need to reference all the field types
    typeService.getInterface(interfaceId),
  )

  useEffect(() => {
    void getInterface()
  }, [interfaceId])

  return {
    error: state.error,
    loading: state.loading,
    type:
      interfaceId && !state.loading
        ? (typeDomainService.getType(interfaceId) as IInterfaceTypeModel)
        : undefined,
  }
}
