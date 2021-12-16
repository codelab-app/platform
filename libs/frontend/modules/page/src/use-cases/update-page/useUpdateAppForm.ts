import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useUpdatePageMutation } from '../../store'
import { UpdatePageFormProps, UpdatePageMutationInput } from './types'

export const useUpdatePageForm = () => {
  const { updateId, entity } = usePageState()
  const { resetModal } = usePageDispatch()

  const [mutate, state] = useUpdatePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: UpdatePageMutationInput) =>
      mutate({
        variables: { input: { updateData: data, pageId: updateId } },
      }).unwrap(),
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating page',
  })

  const onSubmitSuccess = () => resetModal()

  const formProps: UpdatePageFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: { name: entity?.name },
  }

  return {
    formProps,
    state,
    reset: resetModal,
  }
}
