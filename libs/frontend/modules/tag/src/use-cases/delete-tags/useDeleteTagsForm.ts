import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteTagsMutation } from '../../store/tagEndpoints'
import { selectTag, tagActions } from '../../store/tagState'
import { DeleteTagsSchema } from './deleteTagsSchema'

export const useDeleteTagForm = () => {
  const dispatch = useDispatch()
  const { deleteIds } = useSelector(selectTag)
  const reset = () => dispatch(tagActions.resetModal())

  const [mutate, state] = useDeleteTagsMutation({
    selectFromResult: (r) => ({
      hook: r.data?.deleteTags,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    ({ ids }: DeleteTagsSchema) => {
      return mutate({ variables: { input: { ids } } }).unwrap()
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while deleting tags',
      }),
      onSubmitSuccess: () => reset(),
      model: { ids: deleteIds },
    },
    state,
    reset,
  }
}
