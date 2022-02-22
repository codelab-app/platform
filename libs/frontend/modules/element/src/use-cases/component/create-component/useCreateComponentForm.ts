import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ElementCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { useComponentDispatch, useComponentState } from '../../../hooks'
import { useCreateElementsMutation } from '../../../store'
import { CreateComponentInput } from './types'

const mapVariables = (input: CreateComponentInput): ElementCreateInput => {
  const { name } = input

  const componentTag: ElementCreateInput['componentTag'] = {
    create: {
      node: { name, isRoot: true },
    },
  }

  return { componentTag, name }
}

export const useCreateComponentForm: UseUseCaseForm<
  CreateComponentInput,
  CRUDActionType
> = () => {
  const { resetModal } = useComponentDispatch()
  const { actionType } = useComponentState()

  const [mutate, { isLoading }] = useCreateElementsMutation({
    selectFromResult: (r) => ({
      component: r.data?.createElements,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: CreateComponentInput) => {
      const createComponentInput = mapVariables(input)

      return mutate({
        variables: {
          input: createComponentInput,
        },
      }).unwrap()
    },
    [mutate],
  )

  return {
    model: {},
    reset: resetModal,
    onSubmit: handleSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating component',
      }),
    ],
    actionType,
    onSubmitSuccess: [() => resetModal()],
    isLoading,
  }
}
