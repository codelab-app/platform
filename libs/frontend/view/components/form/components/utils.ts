import { SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { MouseEvent } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { DeepPartial } from 'uniforms'

export type SetIsLoading = (isLoading: boolean) => void

export const handleFormSubmit =
  <TData, TResponse>(
    onSubmit: (values: TData) => any | Promise<any>,
    setIsLoading?: SetIsLoading,
    onSubmitSuccess?: ArrayOrSingle<(values: Awaited<TData>) => void>,
    onSubmitError?: ArrayOrSingle<(err: any) => void>,
  ) =>
  async (formData: DeepPartial<TData>) => {
    setIsLoading?.(true)

    try {
      const results = await onSubmit(formData as TData)

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
