import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useDeletePageMutation } from '../../store'
import { DeletePageFormProps, DeletePageMutationInput } from './types'

export const useDeletePageForm = () => {
  const { deleteIds, entity } = usePageState()
  const { reset } = usePageDispatch()

  const [mutate, state] = useDeletePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deletePage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (input: DeletePageMutationInput) => mutate({ variables: { input } }),
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting page',
  })

  const onSubmitSuccess = () => reset()

  const formProps: DeletePageFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: { pageId: deleteIds[0] },
    name: entity?.name,
  }

  return {
    formProps,
    state,
    reset,
  }
}
