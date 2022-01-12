import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback, useRef } from 'react'
import { CreateElementMutationVariables } from '../../../graphql'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useCreateElementMutation } from '../../../store'
import { CreateElementSchema } from './createElementSchema'

export type CreateElementInitialData = Partial<
  Pick<CreateElementSchema, 'parentElementId'>
>

const mapVariables = ({
  componentId,
  atomId,
  ...data
}: CreateElementSchema): CreateElementMutationVariables => {
  return {
    input: {
      ...data,
      atomId,
      instanceOfComponentId: componentId,
    },
  }
}

export const useCreateElementForm = (
  initialData?: CreateElementInitialData,
) => {
  const { createMetadata } = useElementState()
  const initialDataRef = useRef(initialData)
  const { resetModal } = useElementDispatch()

  const [mutate, state] = useCreateElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.createElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: CreateElementSchema) => {
      const variables = mapVariables(submitData)

      return mutate({ variables }).unwrap()
    },
    [mutate],
  )

  return {
    formProps: {
      onSubmit: handleSubmit,
      onSubmitError: createNotificationHandler({
        title: 'Error while creating element',
      }),
      onSubmitSuccess: () => resetModal(),
      model: {
        parentElementId:
          createMetadata?.parentElementId ??
          initialDataRef.current?.parentElementId,
      },
    },
    state,
  }
}
