import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreatePropMapBindingInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'

export const useCreatePropMapBindingForm = () => {
  // const [mutate, { isLoading }] = useCreatePropMapBindingsMutation({
  //   selectFromResult: (r) => ({
  //     hook: r.data?.createPropMapBindings,
  //     isLoading: r.isLoading,
  //     error: r.error,
  //   }),
  // })
  //
  // const { actionType } = usePropMapBindingState()
  // const { resetModal } = usePropMapBindingDispatch()

  const handleSubmit = useCallback(
    ({
      sourceKey,
      targetKey,
      targetElementId,
      elementId,
    }: CreatePropMapBindingInput) => {
      return Promise.reject('Not implemented')

      // return mutate({
      //   variables: {
      //     input: {
      //       sourceKey: sourceKey.trim(),
      //       targetKey: targetKey.trim(),
      //       element: {
      //         connect: { where: { node: { id: elementId } } },
      //       },
      //
      //       targetElement: targetElementId
      //         ? { connect: { where: { node: { id: targetElementId } } } }
      //         : undefined,
      //     },
      //   },
      // }).unwrap()
    },
    [],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating prop binding',
      }),
    ],
    onSubmitSuccess: () => {
      //
    }, // [() => resetModal()],
    isLoading: false,
    reset: () => {
      //
    }, // resetModal,
    actionType: CRUDActionType.Create,
  }
}
