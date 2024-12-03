import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import type { MouseEvent } from 'react'
import type { DeepPartial } from 'uniforms'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { throttle } from 'radash'
import { debounce } from 'remeda'

import type { OptimisticFormProps } from '../modal/ModalForm.Form'

export type SetIsLoading = (isLoading: boolean) => void

type OnSubmitOptimistic<TData, TResponse> = OptimisticFormProps<
  TData,
  TResponse
>['onSubmitOptimistic']

/**
 * Handles loading state and optimistic submit
 */

export const useSubmit = <TData, TResponse>(
  onSubmit: FormProps<TData, TResponse>['onSubmit'],
  setIsLoading?: SetIsLoading,
  onSubmitOptimistic: OnSubmitOptimistic<TData, TResponse> = () => {
    return
  },
) => {
  return async (formData: DeepPartial<TData>) => {
    setIsLoading?.(true)

    const submitPromise = onSubmit(formData as TData)

    onSubmitOptimistic()

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

type PostSubmitProps<TData, TResponse> = Pick<
  OptimisticFormProps<TData, TResponse>,
  'errorMessage' | 'onSubmitError' | 'onSubmitSuccess' | 'successMessage'
>

export const usePostSubmit = <TData, TResponse>({
  errorMessage = 'Error submitting form',
  onSubmitError = () => {
    return
  },
  onSubmitSuccess = () => {
    return
  },
  successMessage = '',
}: PostSubmitProps<TData, TResponse>) => {
  const notifyError = useErrorNotify({ title: errorMessage })
  const notifySuccess = useSuccessNotify({ title: successMessage })
  const errorHandlers = [console.error, notifyError, onSubmitError].flat()

  const successHandlers = successMessage
    ? [notifySuccess, onSubmitSuccess].flat()
    : [onSubmitSuccess]

  return {
    onSubmitError: (error: unknown) =>
      Promise.all(errorHandlers.map((handler) => handler(error))),
    onSubmitSuccess: (result: TResponse) =>
      Promise.all(successHandlers.map((handler) => handler(result))),
  }
}
