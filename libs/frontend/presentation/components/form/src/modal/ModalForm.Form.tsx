import type { FormProps } from '@codelab/frontend/abstract/types'
import throttle from 'lodash/throttle'
import type { ReactElement } from 'react'
import React, { useContext, useImperativeHandle, useRef } from 'react'
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  useForm,
} from 'react-hook-form'
import { handleFormSubmit } from '../components/utils'
import { ModalFormContext } from './modal-form.context'

/**
 * @param onSubmit The fact Uniform types this as `DeepPartial` causes a lot of issue.
 *
 * We don't actually want to use `DeepPartial` because we want to specific the correct shape.
 *
 * But using without `DeepPartial` causes some casting down the line
 */
export const Form = <TData extends FieldValues, TResponse = unknown>({
  autosave = false,
  children,
  model,
  onSubmit,
  onSubmitError = [],
  onSubmitSuccess = [],
  schema,
}: React.PropsWithChildren<FormProps<TData, TResponse>>): ReactElement => {
  const { setIsLoading, submitRef } = useContext(ModalFormContext)
  const formRef = useRef<HTMLFormElement>(null)

  const methods = useForm<TData>({
    defaultValues: model,
  })

  const throttledSubmit = throttle(
    handleFormSubmit<TData, TResponse>(
      onSubmit,
      setIsLoading,
      onSubmitSuccess,
      onSubmitError,
    ),
    200,
  )

  useImperativeHandle(submitRef, () => ({
    submit: () =>
      formRef.current?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      ),
    validate: methods.trigger,
  }))

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(throttledSubmit)} ref={formRef}>
        {children}
      </form>
    </FormProvider>
  )
}
