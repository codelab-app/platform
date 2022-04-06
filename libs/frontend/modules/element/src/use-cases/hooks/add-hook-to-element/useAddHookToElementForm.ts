import { AtomService } from '@codelab/frontend/modules/atom'
import { TypeService } from '@codelab/frontend/modules/type'
import {
  createNotificationHandler,
  useLoadingState,
} from '@codelab/frontend/shared/utils'
import { InterfaceTypeWhere } from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { useEffect } from 'react'
import { AddHookToElementMutationInput, InterfaceProps } from './types'

type UseAddHookToElementForm = (
  elementId: string,
  typeStore: TypeService,
  atomStore: AtomService,
) => any & InterfaceProps

export const useAddHookToElementForm: UseAddHookToElementForm = (
  elementId,
  typeStore,
  atomStore,
) => {
  // const { resetModal, setSelectedType, resetSelectedType } = useHookDispatch()
  // const { selectedType, actionType } = useHookState()
  const [getAtoms] = useLoadingState(() => atomStore.getAll())

  useEffect(() => {
    getAtoms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  assertIsDefined(elementId)

  const [fetchInterface, { data: interfaceType, isLoading: interfaceLoading }] =
    useLoadingState((where: InterfaceTypeWhere) =>
      typeStore.getInterfaceAndDescendants(where),
    )
  //
  // const [mutate, { isLoading }] = useCreateHooksMutation({
  //   selectFromResult: (r) => ({
  //     hook: r.data?.createHooks,
  //     isLoading: r.isLoading,
  //     error: r.error,
  //   }),
  // })

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

    // return mutate({
    //   variables: {
    //     input: {
    //       element: { connect: { where: { node: { id: input.elementId } } } },
    //       config: { create: { node: { data: config } } },
    //       type,
    //     },
    //   },
    // }).unwrap()
    return Promise.reject('Not implemented')
  }

  // const reset = () => {
  //   resetModal()
  //   resetSelectedType()
  // }

  return {
    onChange: (key: string, value: any) => {
      // if (key === 'typeId') {
      //   setSelectedType({ selectedType: value })
      //   fetchInterface({ apiOfAtoms_SOME: { id: value } })
      // }
    },
    interfaceType,
    reset: () => {
      //
    },
    onSubmit,
    onSubmitSuccess: () => {
      //
    }, // [() => resetModal()],
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating hook',
      }),
    ],
    model: {}, // { typeId: selectedType },
    actionType: 'CREATE',
    isLoading: false,
    interfaceLoading,
  }
}
