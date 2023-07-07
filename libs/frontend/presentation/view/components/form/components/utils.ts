import type { IPropData } from '@codelab/frontend/abstract/core'
import { isTypedProp } from '@codelab/frontend/abstract/core'
import type { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import {
  callbackWithParams,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { ErrorObject } from 'ajv'
import get from 'lodash/get'
import isString from 'lodash/isString'
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

/**
 * Skips validation errors if they are all expressions to allow setting an expression values
 * to the field types e.g. ArrayType can have `{{this.products}}`.
 */
export const bypassExpressionErrors = (
  formData: Record<string, unknown>,
  errors?: { details: Array<ErrorObject> },
) => {
  const allExpressionErrors = errors?.details.every((err) => {
    // instancePath has "/" pre-pended
    const errorValue = get(formData, err.instancePath.slice(1))
    const possiblyTypedPropValue = errorValue as IPropData

    // Accept a react node type that has an expression value
    if (
      isTypedProp(possiblyTypedPropValue) &&
      possiblyTypedPropValue.kind === ITypeKind.ReactNodeType &&
      isString(possiblyTypedPropValue.value)
    ) {
      return hasStateExpression(possiblyTypedPropValue.value)
    }

    return hasStateExpression(errorValue)
  })

  if (allExpressionErrors) {
    return null
  }

  return errors
}
