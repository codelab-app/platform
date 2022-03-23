import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { AtomService } from '@codelab/frontend/modules/atom'
import { TypeStore } from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useAsyncState,
} from '@codelab/frontend/shared/utils'
import { InterfaceTypeWhere } from '@codelab/shared/abstract/codegen-v2'
import { assertIsDefined } from '@codelab/shared/utils'
import { useEffect } from 'react'
import { useCreateHooksMutation } from '../../../graphql/hook.endpoints.v2.graphql.gen'
import { useHookDispatch, useHookState } from '../../../hooks'
import { AddHookToElementMutationInput, InterfaceProps } from './types'

type UseAddHookToElementForm = (
  elementId: string,
  typeStore: TypeStore,
  atomStore: AtomService,
) => ReturnType<UseUseCaseForm<any, CRUDActionType, unknown, string>> &
  InterfaceProps

export const useAddHookToElementForm: UseAddHookToElementForm = (
  elementId,
  typeStore,
  atomStore,
) => {
  const { resetModal, setSelectedType, resetSelectedType } = useHookDispatch()
  const { selectedType, actionType } = useHookState()
  const [getAtoms] = useAsyncState(() => atomStore.getAll())

  useEffect(() => {
    getAtoms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  assertIsDefined(elementId)

  const [fetchInterface, { data: interfaceType, isLoading: interfaceLoading }] =
    useAsyncState((where: InterfaceTypeWhere) =>
      typeStore.getInterfaceAndDescendants(where),
    )

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
    const type = atomStore.atom(typeId)?.type
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
        fetchInterface({ apiOfAtoms_SOME: { id: value } })
      }
    },
    interfaceType,
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
