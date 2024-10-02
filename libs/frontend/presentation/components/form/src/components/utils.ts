import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import {
  callbackWithParams,
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import type { MouseEvent } from 'react'
import type { DeepPartial } from 'uniforms'
import type { OptimisticFormProps } from '../modal/ModalForm.Form'

import { callbackWithParams } from '@codelab/frontend/shared/utils'

export type SetIsLoading = (isLoading: boolean) => void

type OnSubmitOptimistic<TData, TResponse> = OptimisticFormProps<
  TData,
  TResponse
>['onSubmitOptimistic']

export const useSubmit = <TData, TResponse>(
  onSubmit: FormProps<TData, TResponse>['onSubmit'],
  setIsLoading?: SetIsLoading,
  onSubmitOptimistic: OnSubmitOptimistic<TData, TResponse> = [],
) => {
  return async (formData: DeepPartial<TData>) => {
    setIsLoading?.(true)

    const submitPromise = onSubmit(formData as TData) as Promise<TResponse>

    callbackWithParams(onSubmitOptimistic, submitPromise)

    return submitPromise.finally(() => setIsLoading?.(false))
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

export const usePostSubmit = <TData, TResponse>({
  errorMessage = 'Error submitting form',
  onSubmitError = [],
  onSubmitSuccess = [],
  successMessage = 'Form submitted successfully',
}: OptimisticFormProps<TData, TResponse>) => {
  const notifyError = useErrorNotify({ title: errorMessage })
  const notifySuccess = useSuccessNotify({ title: successMessage })
  const errorHandlers = [console.error, notifyError, onSubmitError].flat()
  const successHandlers = [notifySuccess, onSubmitSuccess].flat()

  return {
    onSubmitError: (error: unknown) => callbackWithParams(errorHandlers, error),
    onSubmitSuccess: (result: TResponse) =>
      callbackWithParams(successHandlers, result),
  }
}
