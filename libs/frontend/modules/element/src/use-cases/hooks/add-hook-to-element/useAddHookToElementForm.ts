import { useAppState } from '@codelab/frontend/modules/app'
import {
  useGetAtomsTypeHookForSelectQuery,
  useLazyGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useHookDispatch, useHookState } from '../../../hooks'
import { useAddHookToElementMutation } from '../../../store'
import {
  AddHookToElementFormProps,
  AddHookToElementMutationInput,
} from './types'

export const useAddHookToElementForm = (elementId: string) => {
  const { resetModal, setSelectedType, resetSelectedType } = useHookDispatch()
  const { selectedType } = useHookState()
  const { data: atomsData } = useGetAtomsTypeHookForSelectQuery()
  const atoms = atomsData?.getAtomsTypeHook || []
  const { currentApp } = useAppState()

  const [getTypeGraph, { data: interfaceData, isLoading: interfaceLoading }] =
    useLazyGetTypeGraphQuery()

  // create empty tree in case no type is selected
  // this is work around for cleaning interfaceData on reset
  const interfaceTree = useTypeTree(
    selectedType ? interfaceData?.getTypeGraph : undefined,
  )

  const [mutate, state] = useAddHookToElementMutation({
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

  const formProps: AddHookToElementFormProps = {
    onSubmit: handleSubmit,
    onSubmitError: createNotificationHandler({
      title: 'Error while creating hook',
    }),
    interfaceTree,
    interfaceLoading,
    model: {
      typeId: selectedType,
      appId: currentApp?.id,
    },
    onSubmitSuccess: reset,
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
  }

  return {
    reset,
    formProps,
    state,
  }
}
