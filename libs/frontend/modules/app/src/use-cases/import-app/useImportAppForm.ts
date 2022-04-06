import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { ImportAppSchema } from './importAppSchema'

export const useImportAppForm = () => {
  // const { resetModal } = useAppActions()
  // const { actionType } = useAppState()
  const mutate: any = () => null
  const isLoading = false
  // const [mutate, { isLoading }] = useImportAppMutation({
  //   selectFromResult: (r) => ({
  //     hook: r.data?.importApp,
  //     isLoading: r.isLoading,
  //     error: r.error,
  //   }),
  // })

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
    onSubmitSuccess: [],
    reset: () => {
      //
    },
    isLoading,
    actionType: '' as any,
    model: {},
  }
}
