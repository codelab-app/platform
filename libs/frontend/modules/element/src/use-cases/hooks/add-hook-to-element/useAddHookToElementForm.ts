import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { IAtomService, ITypeService } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { useAsync } from 'react-use'
import { AddHookToElementMutationInput, InterfaceProps } from './types'

type UseAddHookToElementForm = (
  elementId: string,
  typeService: ITypeService,
  atomService: IAtomService,
) => any & InterfaceProps

export const useAddHookToElementForm: UseAddHookToElementForm = (
  elementId,
  typeService,
  atomService,
) => {
  useAsync(() => atomService.getAll(), [])

  assertIsDefined(elementId)

  const { loading: interfaceLoading } = useAsync(
    async () => (id: string) => typeService.getInterfaceAndDescendants(id),
    [],
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
    const type = atomService.atom(typeId)?.type
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
    interfaceType: null,
    reset: () => {
      //
    },
    onSubmit,
    onSubmitSuccess: () => {
      //
    },
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating hook',
      }),
    ],
    model: {},
    actionType: 'CREATE',
    loading: false,
    interfaceLoading,
  }
}
