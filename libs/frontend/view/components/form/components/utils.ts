import { SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { MouseEvent } from 'react'

export type SetIsLoading = (isLoading: boolean) => void

export const handleFormSubmit =
  <T>(
    onSubmit: (values: T) => any | Promise<any>,
    setIsLoading?: SetIsLoading,
    onSubmitSuccess?: (values: Awaited<T>) => any,
    onSubmitError?: (err: any) => any,
  ) =>
  async (formData: T) => {
    setIsLoading?.(true)

    try {
      const results = await onSubmit(formData as T)

      setIsLoading?.(false)

      await callbackWithParams(onSubmitSuccess, results as any)

      return results
    } catch (err: any) {
      console.error(err)

      setIsLoading?.(false)

      await callbackWithParams(onSubmitError, err)
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
