import type { SubmitRef } from '@codelab/frontend/abstract/types'
import type { MouseEvent } from 'react'
import type { UnknownObject } from 'uniforms'

import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/infra/context'
import { loadingAtom } from '@codelab/frontend-application-shared-store/loading'
import { useSetAtom } from 'jotai'
import pMinDelay from 'p-min-delay'

import type { OptimisticFormProps } from '../modal/ModalForm.Form'

export type SetIsLoading = (isLoading: boolean) => void

type OnSubmitOptimistic<
  TData extends UnknownObject,
  TResponse,
> = OptimisticFormProps<TData, TResponse>['onSubmitOptimistic']

const MIN_DELAY = 400

/**
 * Handles loading state and optimistic submit for async functions
 */
export const useAsyncHandler = <TData extends UnknownObject, TResponse>(
  /**
   * Additional loaders, we moved the built-in global loading here
   */
  setIsLoading?: SetIsLoading,
) => {
  /**
   * We use `useSetAtom` since we don't need to read the value, this makes sure we don't re-render the component when the loading state changes
   */
  const setLoadingState = useSetAtom(loadingAtom)

  const setAllLoadingState = (loading: boolean) => {
    setIsLoading?.(loading)
    setLoadingState((prev) => ({ ...prev, isLoading: loading }))
  }

  return (
      onSubmit: (data?: TData) => Promise<TResponse>,
      onSubmitOptimistic: OnSubmitOptimistic<TData, TResponse> = () => {
        return
      },
    ) =>
    async (formData?: TData) => {
      setAllLoadingState(true)

      console.log('Form submitted')

      const submitPromise = onSubmit(formData)

      onSubmitOptimistic()

      // Ensure min delay to prevent flickering
      return pMinDelay(submitPromise, MIN_DELAY).finally(() => {
        setAllLoadingState(false)
      })
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

type PostSubmitProps<TData extends UnknownObject, TResponse> = Pick<
  OptimisticFormProps<TData, TResponse>,
  'errorMessage' | 'onSubmitError' | 'onSubmitSuccess' | 'successMessage'
>

export const usePostSubmit = <TData extends UnknownObject, TResponse>({
  errorMessage = 'Error submitting form',
  onSubmitError = () => {
    return Promise.reject()
  },
  onSubmitSuccess = () => {
    return Promise.resolve()
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
