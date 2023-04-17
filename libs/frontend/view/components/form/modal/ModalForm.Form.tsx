import type { FormProps } from '@codelab/frontend/abstract/types'
import type { ReactElement } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { handleFormSubmit } from '../components/utils'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'
import { ModalFormContext } from './ModalForm.Context'

/**
 * @param onSubmit The fact Uniform types this as `DeepPartial` causes a lot of issue.
 *
 * We don't actually want to use `DeepPartial` because we want to specific the correct shape.
 *
 * But using without `DeepPartial` causes some casting down the line
 */
export const Form = <TData, TResponse = unknown>({
  autosave = false,
  children,
  model,
  modelTransform,
  onChange,
  onChangeModel,
  onSubmit = (_model: unknown) => Promise.resolve(),
  onSubmitError = [],
  onSubmitSuccess = [],
  optimistic = false,
  schema,
}: React.PropsWithChildren<
  Omit<FormProps<TData, TResponse>, 'submitRef'>
>): ReactElement => {
  const { setIsLoading, submitRef } = useContext(ModalFormContext)

  const [bridge, setBridge] = useState(
    schema instanceof Bridge ? schema : createBridge(schema),
  )

  let onFormSubmit = onSubmit
  let onFormSubmitError = onSubmitError

  if (optimistic) {
    onFormSubmit = async (...args) => {
      onSubmit(...args).catch((error) => {
        if (Array.isArray(onSubmitError)) {
          onSubmitError.forEach((onError) => onError(error))
        } else {
          onSubmitError(error)
        }
      })
    }

    onFormSubmitError = []
  }

  useEffect(() => {
    setBridge(schema instanceof Bridge ? schema : createBridge(schema))
  }, [schema])

  return (
    <AutoForm<TData>
      autosave={autosave}
      autosaveDelay={500}
      model={model}
      modelTransform={modelTransform}
      onChange={onChange}
      onChangeModel={onChangeModel}
      onSubmit={handleFormSubmit<TData, TResponse>(
        onFormSubmit,
        setIsLoading,
        onSubmitSuccess,
        onFormSubmitError,
      )}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
      showInlineError
    >
      {children}
    </AutoForm>
  )
}
