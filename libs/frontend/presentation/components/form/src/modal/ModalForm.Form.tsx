'use client'

import type { FormProps } from '@codelab/frontend/abstract/types'
import throttle from 'lodash/throttle'
import type { ReactElement } from 'react'
import React, { useContext, useEffect, useState } from 'react'
import type { UnknownObject } from 'uniforms'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { handleFormSubmit } from '../components/utils'
import {
  connectUniformSubmitRef,
  createBridge,
} from '../hooks/uniformUtils.hook'
import { ModalFormContext } from './modal-form.context'

/**
 * @param onSubmit The fact Uniform types this as `DeepPartial` causes a lot of issue.
 *
 * We don't actually want to use `DeepPartial` because we want to specific the correct shape.
 *
 * But using without `DeepPartial` causes some casting down the line
 */
export const Form = <TData extends UnknownObject, TResponse = unknown>({
  autosave = false,
  children,
  model,
  modelTransform,
  onChange,
  onChangeModel,
  onSubmit,
  onSubmitError = [],
  onSubmitSuccess = [],
  schema,
}: React.PropsWithChildren<
  Omit<FormProps<TData, TResponse>, 'submitRef'>
>): ReactElement => {
  const { setIsLoading, submitRef } = useContext(ModalFormContext)

  const [bridge, setBridge] = useState(
    schema instanceof Bridge ? schema : createBridge<TData>(schema),
  )

  useEffect(() => {
    setBridge(schema instanceof Bridge ? schema : createBridge<TData>(schema))
  }, [schema])

  return (
    <AutoForm<TData>
      autosave={autosave}
      autosaveDelay={250}
      model={model}
      modelTransform={modelTransform}
      onChange={onChange}
      onChangeModel={onChangeModel}
      onSubmit={throttle(
        handleFormSubmit<TData, TResponse>(
          onSubmit,
          setIsLoading,
          onSubmitSuccess,
          onSubmitError,
        ),
        200,
      )}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
      showInlineError
    >
      {children}
    </AutoForm>
  )
}
