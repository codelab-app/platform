import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { useAppDispatch } from '../../hooks'
import { useImportAppMutation } from '../../store'
import { ImportAppFormProps } from './ImportAppForm'
import { ImportAppSchema } from './importAppSchema'

export const useImportAppForm = () => {
  const { reset } = useAppDispatch()

  const [mutate, state] = useImportAppMutation({
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

      return mutate({ variables: { input: { payload: text } } })
    },
    [mutate],
  )

  const onSubmitSuccess = () => reset()

  const onSubmitError = createNotificationHandler({
    title: 'Error while importing app',
  })

  const formProps: ImportAppFormProps = {
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
  }

  return {
    formProps,
    state,
    reset,
  }
}
