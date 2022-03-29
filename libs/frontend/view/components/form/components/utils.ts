import { SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { MouseEvent } from 'react'

export const handleFormSubmit =
  <T>(
    onSubmit: (values: T) => any | Promise<any>,
    setIsLoading?: (isLoading: boolean) => void,
    onSubmitSuccess?: (values: Awaited<T>) => any,
    onSubmitError?: (err: any) => any,
  ) =>
  async (formData: T) => {
    setIsLoading?.(true)

    try {
      const r = await onSubmit(formData as T)

      callbackWithParams(onSubmitSuccess, r as any)

      return r
    } catch (err: any) {
      console.error(err)
      callbackWithParams(onSubmitError, err)
    } finally {
      setIsLoading?.(false)
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
