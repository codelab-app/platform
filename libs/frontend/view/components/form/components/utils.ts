import { SubmitRef } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { MouseEvent } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { DeepPartial } from 'uniforms'

export type SetIsLoading = (isLoading: boolean) => void

type OnSubmitSuccess<TIn> = (values: TIn) => void

type OnSubmitError = (error: unknown) => void

export const handleFormSubmit =
  <TData, TResponse>(
    onSubmit: (values: TData) => unknown | Promise<unknown>,
    setIsLoading?: SetIsLoading,
    onSubmitSuccess?: ArrayOrSingle<OnSubmitSuccess<TData>>,
    onSubmitError?: ArrayOrSingle<OnSubmitError>,
  ) =>
  async (formData: DeepPartial<TData>) => {
    setIsLoading?.(true)

    try {
      const results = await onSubmit(formData as TData)

      setIsLoading?.(false)

      await callbackWithParams<TData, OnSubmitSuccess<TData>>(
        onSubmitSuccess,
        results as TData,
      )

      return results
    } catch (err: unknown) {
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
