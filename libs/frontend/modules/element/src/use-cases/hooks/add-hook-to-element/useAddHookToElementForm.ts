import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { useAppState } from '@codelab/frontend/modules/app'
import {
  useGetAtomsTypeHookForSelectQuery,
  useLazyGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { assertIsDefined } from '@codelab/shared/utils'
import { useHookDispatch, useHookState } from '../../../hooks'
import { useAddHookToElementMutation } from '../../../store'
import { AddHookToElementMutationInput, InterfaceProps } from './types'

export const useAddHookToElementForm: UseUseCaseForm<
  any,
  CRUDActionType,
  string,
  InterfaceProps
> = (elementId) => {
  const { resetModal, setSelectedType, resetSelectedType } = useHookDispatch()
  const { selectedType, actionType } = useHookState()
  const { data: atomsData } = useGetAtomsTypeHookForSelectQuery()
  const atoms = atomsData?.getAtomsTypeHook || []
  const { currentApp } = useAppState()

  assertIsDefined(elementId)

  const [getTypeGraph, { data: interfaceData, isLoading: interfaceLoading }] =
    useLazyGetTypeGraphQuery()

  // create empty tree in case no type is selected
  // this is work around for cleaning interfaceData on reset
  const interfaceTree = useTypeTree(
    selectedType ? interfaceData?.getTypeGraph : undefined,
  )

  const [mutate, { isLoading }] = useAddHookToElementMutation({
    selectFromResult: (r) => ({
      hook: r.data?.addHookToElement,
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

  const handleSubmit = (submitData: AddHookToElementMutationInput) => {
    const input = mapFormDataToMutationInput(submitData)

    if (!input) {
      return
    }

    return mutate({ variables: { input } }).unwrap()
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
            input: {
              where: {
                atomId: value,
              },
            },
          },
        })
      }
    },
    interfaceTree,
    reset,
    onSubmit: handleSubmit,
    onSubmitSuccess: [reset],
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating hook',
      }),
    ],
    model: {
      typeId: selectedType,
      appId: currentApp?.id,
    },
    actionType,
    isLoading,
    interfaceLoading,
  }
}
