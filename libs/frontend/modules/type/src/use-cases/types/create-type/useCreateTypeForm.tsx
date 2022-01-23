import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { UseUseCaseForm } from '@codelab/frontend/abstract/types'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { CreateTypeInput } from '@codelab/shared/abstract/codegen'
import { useCallback } from 'react'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { useCreateTypeMutation } from '../../../store'
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

  const [mutate, { isLoading }] = useCreateTypeMutation({
    selectFromResult: (r) => ({
      element: r.data?.createType,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    (submitData: CreateTypeSchema) => {
      const input = mapCreateTypeSchemaToTypeInput(submitData)

      return mutate({ variables: { input } }).unwrap()
    },
    [mutate],
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
    isLoading,
    reset: resetModal,
    actionType,
  }
}
