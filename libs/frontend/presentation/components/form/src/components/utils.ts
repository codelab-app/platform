import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { loadingAtom } from '@codelab/frontend-application-shared-store/loading'
import { getDefaultStore } from 'jotai'
import type { MouseEvent } from 'react'
import type { DeepPartial } from 'uniforms'

export type SetIsLoading = (isLoading: boolean) => void

export const handleFormSubmit = <TData, TResponse>(
  onSubmit: FormProps<TData, TResponse>['onSubmit'],
  setIsLoading?: SetIsLoading,
  onSubmitSuccess?: FormProps<TData, TResponse>['onSubmitSuccess'],
  onSubmitError?: FormProps<TData, TResponse>['onSubmitError'],
) => {
  return async (formData: DeepPartial<TData>) => {
    /**
     * Set loading indicators. For optimistic updates, the promises are not awaited here, we set loading state in the callback of services called
     */
    setIsLoading?.(true)

    try {
      const results = (await onSubmit(formData as TData)) as TResponse

      if (onSubmitSuccess) {
        callbackWithParams(onSubmitSuccess, results)
      }

      // setIsLoading?.(false)
    } catch (err: unknown) {
      console.error(err)

      /**
       * Set loading indicators
       */
      // setIsLoading?.(false)

      if (onSubmitError) {
        callbackWithParams(onSubmitError, err)
      }
    }

    return null
  }
}

export const handleSubmitRefModalOk = (
  submitRef: SubmitRef['submitRef'],
  onOk?: (event: MouseEvent<HTMLButtonElement>) => void,
) => {
  return (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!submitRef?.current) {
      throw new Error('Submit controller ref not initialized')
    }

    // Submits the form
    submitRef.current.submit()

    // Call the callback from the modalProps prop, if defined
    if (onOk) {
      onOk(event)
    }
  }
}
