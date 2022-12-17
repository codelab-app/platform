import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import type { MouseEvent } from 'react'
import type { DeepPartial } from 'uniforms'

export type SetIsLoading = (isLoading: boolean) => void

export const handleFormSubmit =
  <TData, TResponse>(
    onSubmit: FormProps<TData, TResponse>['onSubmit'],
    setIsLoading?: SetIsLoading,
    onSubmitSuccess?: FormProps<TData, TResponse>['onSubmitSuccess'],
    onSubmitError?: FormProps<TData, TResponse>['onSubmitError'],
  ) =>
  async (formData: DeepPartial<TData>) => {
    setIsLoading?.(true)

    try {
      const results = (await onSubmit(formData as TData)) as TResponse

      setIsLoading?.(false)

      if (onSubmitSuccess) {
        callbackWithParams(onSubmitSuccess, results)
      }
    } catch (err: unknown) {
      console.error(err)

      setIsLoading?.(false)

      if (onSubmitError) {
        callbackWithParams(onSubmitError, err)
      }
    }
  }

export const handleSubmitRefModalOk = (
  submitRef: SubmitRef['submitRef'],
  onOk?: (e: MouseEvent<HTMLElement>) => void,
) => {
  return (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (!submitRef?.current) {
      throw new Error('Submit controller ref not initialized')
    }

    // Submits the form
    submitRef.current.submit()

    // Call the callback from the modalProps prop, if defined
    if (onOk) {
      onOk(e)
    }
  }
}
