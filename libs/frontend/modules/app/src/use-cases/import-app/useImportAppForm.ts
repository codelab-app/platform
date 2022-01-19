import { AppActionType } from '@codelab/frontend/abstract/core'
import {
  UseCaseFormWithRef,
  UseUseCaseForm,
} from '@codelab/frontend/abstract/props'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAppDispatch, useAppState } from '../../hooks'
import { useImportAppMutation } from '../../store'
import { ImportAppSchema } from './importAppSchema'

export const useImportAppForm: UseUseCaseForm<
  ImportAppSchema,
  AppActionType
> = () => {
  const { resetModal } = useAppDispatch()
  const { actionType } = useAppState()

  const [mutate, { isLoading }] = useImportAppMutation({
    selectFromResult: (r) => ({
      hook: r.data?.importApp,
      isLoading: r.isLoading,
      error: r.error,
    }),
  })

  const onSubmit = useCallback(
    async (input: ImportAppSchema) => {
      const text = await input.file.originFileObj?.text()
      console.log(text)

      if (!text) {
        throw new Error("Can't parse file") // shouldn't happen, we test in the form
      }

      return mutate({ variables: { input: { payload: text } } }).unwrap()
    },
    [mutate],
  )

  const onSubmitError = createNotificationHandler({
    title: 'Error while importing app',
  })

  return {
    onSubmit,
    onSubmitError: [onSubmitError],
    onSubmitSuccess: [() => resetModal()],
    reset: resetModal,
    isLoading,
    actionType,
    model: {},
  }
}
