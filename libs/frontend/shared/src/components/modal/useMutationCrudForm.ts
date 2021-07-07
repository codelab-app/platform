import * as Apollo from '@apollo/client'
import {
  MutationFunctionOptions,
  MutationTuple,
} from '@apollo/client/react/types/types'
import { FetchResult } from 'apollo-link'
import { useCallback, useEffect } from 'react'
import { CRUDModalState, EntityType } from './crudModalsState'
import { useCRUDModalForm, UseCRUDModalFormData } from './useCrudModalState'

/**
 * Input options for {@link useMutationCrudForm}
 */
export interface UseMutationCrudFormOptions<
  TMutation,
  TMutationVariables,
  TSubmitData,
> {
  entityType: EntityType
  mutationOptions?: Apollo.MutationHookOptions<TMutation, TMutationVariables>
  mutationFunctionOptions?: Omit<
    MutationFunctionOptions<TMutation, TMutationVariables>,
    'variables'
  >
  useMutationFunction:
    | ((
        baseOptions?: Apollo.MutationHookOptions<TMutation, TMutationVariables>,
      ) => MutationTuple<TMutation, TMutationVariables>)
    | {
        provider: (
          state: CRUDModalState,
        ) => (
          baseOptions?: Apollo.MutationHookOptions<
            TMutation,
            TMutationVariables
          >,
        ) => MutationTuple<TMutation, TMutationVariables>
      }
  mapVariables: (
    formData: TSubmitData,
    crudModalState: CRUDModalState,
  ) => TMutationVariables
}

/**
 * Data and methods returned from {@link useMutationCrudForm}
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
export const useMutationCrudForm = <TSubmitData, TMutation, TMutationVariables>(
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

  const crudModal = useCRUDModalForm(entityType)
  const { setLoading } = crudModal

  const mutationFn =
    typeof useMutationFunction === 'function'
      ? useMutationFunction
      : useMutationFunction.provider(crudModal.state)

  const [mutate, mutationData] = mutationFn(mutationOptions)
  const { loading } = mutationData

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  const handleSubmit = useCallback(
    (submitData: TSubmitData) => {
      return mutate({
        ...mutationFunctionOptions,
        variables: mapVariables(submitData, crudModal.state),
      })
    },
    [mapVariables, mutate, mutationFunctionOptions, crudModal.state],
  )

  return { crudModal, mutate, mutationData, handleSubmit }
}
