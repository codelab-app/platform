import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateElementInput } from '@codelab/shared/abstract/codegen'
import { useCallback, useRef } from 'react'
import { CreateElementMutationVariables } from '../../../graphql'
import { useElementDispatch, useElementState } from '../../../hooks'
import { useCreateElementMutation } from '../../../store'

export type ParentElementId = Partial<
  Pick<CreateElementInput, 'parentElementId'>
>

const mapVariables = ({
  instanceOfComponentId,
  atomId,
  ...data
}: CreateElementInput): CreateElementMutationVariables => {
  return {
    input: {
      ...data,
      atomId,
      instanceOfComponentId,
    },
  }
}

export const useCreateElementForm: UseUseCaseForm<
  CreateElementInput,
  CRUDActionType,
  unknown,
  ParentElementId
> = (initialData) => {
  const { createMetadata, actionType } = useElementState()
  const initialDataRef = useRef(initialData)
  const { resetModal } = useElementDispatch()

  const [mutate, { isLoading }] = useCreateElementMutation({
    selectFromResult: (r) => ({
      element: r.data?.createElement,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (submitData: CreateElementInput) => {
      const variables = mapVariables(submitData)

      return mutate({ variables }).unwrap()
    },
    [mutate],
  )

  return {
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating element',
      }),
    ],
    onSubmitSuccess: [() => resetModal()],
    model: {
      parentElementId:
        createMetadata?.parentElementId ??
        initialDataRef.current?.parentElementId,
    },
    isLoading,
    reset: resetModal,
    actionType,
  }
}
