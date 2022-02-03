import { useUser } from '@auth0/nextjs-auth0'
import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { useCreateType } from '../../../hooks/useCreateType'
import {
  CreateTypeSchema,
  mapCreateTypeSchemaToTypeInput,
} from './createTypeSchema'

export const useCreateTypeForm: UseUseCaseForm<
  CreateTypeSchema,
  CRUDActionType
> = () => {
  const { resetModal } = useTypeDispatch()
  const { actionType } = useTypeState()
  const createMutations = useCreateType()
  const user = useUser()

  const onSubmit = useCallback(
    (submitData: CreateTypeSchema) => {
      const [mutate] =
        createMutations[submitData.kind as keyof typeof createMutations]

      // Check if we're not making a recursive rel

      const input = mapCreateTypeSchemaToTypeInput(
        submitData,
        user.user?.sub,
      ) as any

      return mutate({ variables: { input } }).unwrap()
    },
    [createMutations, user.user?.sub],
  )

  return {
    onSubmit,
    onSubmitError: [
      createNotificationHandler({
        title: 'Error while creating type',
      }),
    ],
    model: {},
    onSubmitSuccess: [() => resetModal()],
    isLoading: Object.values(createMutations).some((v) => v[1].isLoading),
    reset: resetModal,
    actionType,
  }
}
