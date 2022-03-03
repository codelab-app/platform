import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import {
  useLazyGetInterfaceTypeGraphsQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { assertIsDefined } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useCreateHooksMutation } from '../../../graphql/hook.endpoints.v2.graphql.gen'
import { useHookDispatch, useHookState } from '../../../hooks'
import { AddHookToElementMutationInput, InterfaceProps } from './types'

type UseAddHookToElementForm = (
  elementId: string,
) => ReturnType<UseUseCaseForm<any, CRUDActionType, unknown, string>> &
  InterfaceProps

export const useAddHookToElementForm: UseAddHookToElementForm = (elementId) => {
  const { resetModal, setSelectedType, resetSelectedType } = useHookDispatch()
  const { selectedType, actionType } = useHookState()

  const { data: atomsData } = useGetAtomsQuery({
    variables: { where: { name_CONTAINS: 'Hook' } },
  })

  const atoms = atomsData?.atoms || []
  const { query } = useRouter()
  const appId = query.appId as string

  assertIsDefined(elementId)

  const [getTypeGraph, { data: interfaceData, isLoading: interfaceLoading }] =
    useLazyGetInterfaceTypeGraphsQuery()

  // create empty tree in case no type is selected
  // this is work around for cleaning interfaceData on reset
  const interfaceTree = useTypeTree(interfaceData?.types[0]?.graph)

  const [mutate, { isLoading }] = useCreateHooksMutation({
    selectFromResult: (r) => ({
      hook: r.data?.createHooks,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const mapFormDataToMutationInput = (
    submitData: AddHookToElementMutationInput,
  ) => {
    const { typeId, ...configObj } = submitData
    const type = atoms.find((x) => x.id === typeId)?.type
    const config = JSON.stringify(configObj)

    return type ? { elementId, type, config } : undefined
  }

  const onSubmit = (submitData: AddHookToElementMutationInput) => {
    const input = mapFormDataToMutationInput(submitData)

    if (!input) {
      return Promise.resolve()
    }

    const { type, config } = input

    return mutate({
      variables: {
        input: {
          element: { connect: { where: { node: { id: input.elementId } } } },
          config: { create: { node: { data: config } } },
          type,
        },
      },
    }).unwrap()
  }

  const reset = () => {
    resetModal()
    resetSelectedType()
  }

  return {
    onChange: (key: string, value: any) => {
      if (key === 'typeId') {
        setSelectedType({ selectedType: value })
        getTypeGraph({
          variables: {
            where: { apiOfAtoms: { id: value } },
          },
        })
      }
    },
    interfaceTree,
    reset,
    onSubmit,
    onSubmitSuccess: [() => resetModal()],
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating hook',
      }),
    ],
    model: { typeId: selectedType },
    actionType,
    isLoading,
    interfaceLoading,
  }
}
