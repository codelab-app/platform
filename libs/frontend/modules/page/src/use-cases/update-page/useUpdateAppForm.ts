import { useAppState } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { usePageDispatch, usePageState } from '../../hooks'
import { useUpdatePageMutation } from '../../store'
import { UpdatePageFormProps, UpdatePageMutationInput } from './types'

export const useUpdatePageForm = () => {
  const { currentApp } = useAppState()
  const { updateId, entity } = usePageState()
  const { reset } = usePageDispatch()

  const [mutate, state] = useUpdatePageMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updatePage,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (data: UpdatePageMutationInput) => {
      return mutate({
        variables: { input: { updateData: data, pageId: updateId } },
      })
    },
    [mutate, updateId],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while updateing page',
  })

  const onSubmitSuccess = () => reset()

  const formProps: UpdatePageFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    model: {
      name: entity?.name,
      appId: currentApp?.id,
    },
  }

  return {
    formProps,
    state,
    reset,
  }
}
