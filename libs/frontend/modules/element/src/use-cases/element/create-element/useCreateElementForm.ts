import {
  createNotificationHandler,
  notify,
} from '@codelab/frontend/shared/utils'
import { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateElementMutationVariables } from '../../../graphql'
import {
  elementActions,
  selectElement,
  useCreateElementMutation,
} from '../../../store'
import { CreateElementSchema } from './createElementSchema'

export type CreateElementInitialData = Partial<
  Pick<CreateElementSchema, 'parentElementId'>
>

const mapVariables = ({
  componentId,
  ...formData
}: CreateElementSchema): CreateElementMutationVariables => {
  if (formData.atomId && componentId) {
    const message = 'Set either atom or component, not both'
    notify({ title: message, type: 'error' })
    throw new Error(message)
  }

  return {
    input: {
      ...formData,
      childrenIds: componentId ? [componentId] : undefined,
    },
  }
}

export const useCreateElementForm = (
  initialData?: CreateElementInitialData,
) => {
  const { createMetadata } = useSelector(selectElement)
  const initialDataRef = useRef(initialData)
  const dispatch = useDispatch()

  const [mutate, state] = useCreateElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.createElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const reset = () => dispatch(elementActions.resetModal())

  const handleSubmit = useCallback(
    (submitData: CreateElementSchema) => {
      const variables = mapVariables(submitData)

      return mutate({ variables })
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating element',
      }),
      onSubmitSuccess: () => reset(),
      model: {
        parentElementId:
          createMetadata?.parentElementId ??
          initialDataRef.current?.parentElementId,
      },
    },
    state,
  }
}

export type UseCreateElementForm = ReturnType<typeof useCreateElementForm>
