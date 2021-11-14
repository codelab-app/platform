import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateTagMutation } from '../../store/tagEndpoints'
import { selectTag, tagActions } from '../../store/tagState'
import { UpdateTagSchema } from './updateTagSchema'

export const useUpdateTagForm = () => {
  const dispatch = useDispatch()
  const { updateId, entity } = useSelector(selectTag)

  const [mutate, state] = useUpdateTagMutation({
    selectFromResult: (r) => ({
      hook: r.data?.updateTag,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(tagActions.resetModal())

  const handleSubmit = useCallback(
    ({ name }: UpdateTagSchema) => {
      return mutate({
        variables: { input: { data: { name }, id: updateId } },
      })
    },
    [mutate, updateId],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while updating tag',
      }),
      onSubmitSuccess: () => reset(),
      model: entity,
    },
    state,
    reset,
  }
}
