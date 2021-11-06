import * as Apollo from '@apollo/client'
import { MutationTuple } from '@apollo/client/react/types/types'
import { Exact } from '@codelab/frontend/abstract/codegen'
import { GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
import type { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { UseMutationStateOptions } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { MutationDefinition } from '@reduxjs/toolkit/query'
import { FetchResult } from 'apollo-link'
import type { RequestDocument } from 'graphql-request/dist/types'
import { useCallback, useEffect } from 'react'
import { CRUDModalState, EntityType } from './crudModalsState'
import { useCrudModalForm, UseCRUDModalFormData } from './useCrudModalForm'

type CustomMutationDefinition<
  TMutation,
  TMutationVariables extends { [key: string]: unknown },
> = MutationDefinition<
  Exact<TMutationVariables>,
  ({
    document,
    variables,
  }: {
    document: RequestDocument
    variables: any
  }) => Promise<
    | { data: any; error?: undefined }
    | { error: { status: number; data: any }; data?: undefined }
  >,
  any,
  TMutation,
  any
>

/**
 * Input options for {@link useCrudModalMutationForm}
 */
export interface UseMutationCrudFormOptions<
  TMutation,
  TMutationVariables extends { [key: string]: unknown },
  TSubmitData,
> {
  entityType: EntityType
  mutationOptions?:
    | UseMutationStateOptions<
        CustomMutationDefinition<TMutation, TMutationVariables>,
        Record<string, any>
      >
    | Apollo.MutationHookOptions<TMutation, TMutationVariables> // TODO remove apollo types after we migrate to RTK query entirely
    | ((
        crudModalState: CRUDModalState,
      ) => Apollo.MutationHookOptions<TMutation, TMutationVariables>)
  mutationFunctionOptions?: Omit<
    GraphqlOperationOptions<TMutationVariables>,
    'variables'
  >
  useMutationFunction:
    | any
    | UseMutation<CustomMutationDefinition<TMutation, TMutationVariables>>
  mapVariables: (
    formData: TSubmitData,
    crudModalState: CRUDModalState,
  ) => TMutationVariables
}

/**
 * Data and methods returned from {@link useCrudModalMutationForm}
 */
export interface UseMutationCrudFormData<
  TSubmitData,
  TMutation,
  TMutationVariables,
> {
  crudModal: UseCRUDModalFormData
  mutate: MutationTuple<TMutation, TMutationVariables>[0]
  mutationData: MutationTuple<TMutation, TMutationVariables>[1]
  handleSubmit: (data: TSubmitData) => Promise<FetchResult<TMutation>>
}

/**
 * Facade hook for setting up the state and methods needed to create a CRUD form that uses a apollo graphql mutation
 */
export const useCrudModalMutationForm = <
  TSubmitData,
  TMutation,
  TMutationVariables extends { [key: string]: unknown },
>(
  options: UseMutationCrudFormOptions<
    TMutation,
    TMutationVariables,
    TSubmitData
  >,
): UseMutationCrudFormData<TSubmitData, TMutation, TMutationVariables> => {
  const {
    entityType,
    useMutationFunction,
    mutationOptions,
    mapVariables,
    mutationFunctionOptions,
  } = options

  const crudModal = useCrudModalForm(entityType)
  const { setLoading } = crudModal

  const [mutate, mutationData] = useMutationFunction(
    typeof mutationOptions === 'function'
      ? mutationOptions(crudModal.state)
      : mutationOptions,
  )

  const { loading } = mutationData

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  const handleSubmit = useCallback(
    (submitData: TSubmitData) => {
      try {
        const variables = mapVariables(submitData, crudModal.state)

        return mutate({
          ...mutationFunctionOptions,
          variables,
        })
      } catch (e) {
        console.error(`Error while mapping variables in ${entityType} form`, e)
        throw e
      }
    },
    [mapVariables, crudModal.state, mutate, entityType],
  )

  return { crudModal, mutate, mutationData, handleSubmit }
}
