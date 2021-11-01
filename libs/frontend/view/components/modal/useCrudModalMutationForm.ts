import * as Apollo from '@apollo/client'
import {
  MutationFunctionOptions,
  MutationTuple,
} from '@apollo/client/react/types/types'
import { FetchResult } from 'apollo-link'
import { useCallback, useEffect } from 'react'
import { CRUDModalState, EntityType } from './crudModalsState'
import { useCrudModalForm, UseCRUDModalFormData } from './useCrudModalForm'

/**
 * Input options for {@link useCrudModalMutationForm}
 */
export interface UseMutationCrudFormOptions<
  TMutation,
  TMutationVariables,
  TSubmitData,
> {
  entityType: EntityType
  mutationOptions?:
    | Apollo.MutationHookOptions<TMutation, TMutationVariables>
    | ((
        crudModalState: CRUDModalState,
      ) => Apollo.MutationHookOptions<TMutation, TMutationVariables>)
  mutationFunctionOptions?: Omit<
    MutationFunctionOptions<TMutation, TMutationVariables>,
    'variables'
  >
  useMutationFunction: any
  /*     | ((
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
 */ mapVariables: (
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
  TMutationVariables,
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

  const mutationFn =
    typeof useMutationFunction === 'function'
      ? useMutationFunction
      : useMutationFunction.provider(crudModal.state)

  const [mutate, mutationData] = mutationFn(
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
    [
      mapVariables,
      crudModal.state,
      mutate,
      mutationFunctionOptions,
      entityType,
    ],
  )

  return { crudModal, mutate, mutationData, handleSubmit }
}
