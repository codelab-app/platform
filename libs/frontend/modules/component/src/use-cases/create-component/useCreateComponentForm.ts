import {
  CRUDActionType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { useUserState } from '@codelab/frontend/modules/user'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { useCallback } from 'react'
import { useComponentDispatch, useComponentState } from '../../hooks'
import { useCreateComponentsMutation } from '../../store'
import { CreateComponentInput } from './types'

const mapVariables = (
  input: CreateComponentInput,
  auth0Id: string,
): ComponentCreateInput => {
  const { name } = input

  const rootElement: ComponentCreateInput['rootElement'] = {
    create: { node: { name: ROOT_ELEMENT_NAME } },
  }

  return {
    name,
    rootElement,
    owner: { connect: { where: { node: { auth0Id } } } },
  }
}

export const useCreateComponentForm: UseUseCaseForm<
  CreateComponentInput,
  CRUDActionType
> = () => {
  const { resetModal } = useComponentDispatch()
  const { actionType } = useComponentState()
  const { user } = useUserState()

  const [mutate, { isLoading }] = useCreateComponentsMutation({
    selectFromResult: (r) => ({
      component: r.data?.createComponents,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const handleSubmit = useCallback(
    (input: CreateComponentInput) => {
      const createComponentInput = mapVariables(input, user.auth0Id)

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
