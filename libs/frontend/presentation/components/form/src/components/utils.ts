import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams, notify } from '@codelab/frontend/shared/utils'
import type { MouseEvent } from 'react'
import type { DeepPartial } from 'uniforms'
import type { OptimisticFormProps } from '../modal/ModalForm.Form'

export type SetIsLoading = (isLoading: boolean) => void

type OnSubmitOptimistic<TData, TResponse> = OptimisticFormProps<
  TData,
  TResponse
>['onSubmitOptimistic']

type OnSubmitSuccess<TData, TResponse> = OptimisticFormProps<
  TData,
  TResponse
>['onSubmitSuccess']

type OnSubmitError<TData, TResponse> = OptimisticFormProps<
  TData,
  TResponse
>['onSubmitError']

export const handleFormSubmit = <TData, TResponse>(
  onSubmit: FormProps<TData, TResponse>['onSubmit'],
  setIsLoading?: SetIsLoading,
  onSubmitSuccess?: OnSubmitSuccess<TData, TResponse>,
  onSubmitError?: OnSubmitError<TData, TResponse>,
  onSubmitOptimistic?: OnSubmitOptimistic<TData, TResponse>,
) => {
  return async (formData: DeepPartial<TData>) => {
    /**
     * Set loading indicators. For optimistic updates, the promises are not awaited here, we set loading state in the callback of services called
     */
    setIsLoading?.(true)

    try {
      const submitPromise = onSubmit(formData as TData)

      if (onSubmitOptimistic) {
        callbackWithParams(
          onSubmitOptimistic,
          submitPromise as Promise<TResponse>,
        )
      }

      const result = await submitPromise

      if (onSubmitSuccess) {
        callbackWithParams(onSubmitSuccess, result as TResponse)
      }
    } catch (err: unknown) {
      console.error(err)

      if (onSubmitError) {
        callbackWithParams(onSubmitError, err)
      }
    } finally {
      setIsLoading?.(false)
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

export const usePostSubmissionHandlers = <TData, TResponse>({
  errorMessage,
  onSubmitError = [],
  onSubmitOptimistic = [],
  onSubmitSuccess = [],
  successMessage,
}: OptimisticFormProps<TData, TResponse>) => {
  const notifyError = (error: unknown) =>
    notify({
      description: (error as Error).message,
      title: errorMessage ?? 'Error submitting form',
      type: 'error',
    })

  const notifySuccess = () =>
    notify({
      title: successMessage ?? 'Form submitted successfully',
      type: 'success',
    })

  return {
    onSubmitError: [
      notifyError,
      ...(Array.isArray(onSubmitError) ? onSubmitError : [onSubmitError]),
    ],
    onSubmitOptimistic,
    onSubmitSuccess: [
      notifySuccess,
      ...(Array.isArray(onSubmitSuccess) ? onSubmitSuccess : [onSubmitSuccess]),
    ],
  }
}
