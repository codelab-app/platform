'use client'

import type { FormProps, VoidCallback } from '@codelab/frontend/abstract/types'
import {
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend/shared/utils'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import { throttle } from 'radash'
import type { ReactElement } from 'react'
import { useContext, useEffect, useState } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import {
  handleFormSubmit,
  usePostSubmissionHandlers,
} from '../components/utils'
import { ModalFormContext } from './modal-form.context'

export interface OptimisticFormProps<TData, TResponse>
  extends React.PropsWithChildren<
    // Only standalone form should have `uiKey`
    Omit<FormProps<TData, TResponse>, 'submitRef' | 'uiKey'>
  > {
  errorMessage?: string
  onSubmitOptimistic?: ArrayOrSingle<VoidCallback<Promise<TResponse>>>
  successMessage?: string
}

export const Form = <TData extends ObjectLike, TResponse = unknown>(
  props: OptimisticFormProps<TData, TResponse>,
): ReactElement => {
  const {
    autosave = false,
    children,
    model,
    modelTransform,
    onChange,
    onChangeModel,
    onSubmit,
    schema,
  } = props

  const { setIsLoading, submitRef } = useContext(ModalFormContext)
  const { setLoading } = useLoading()
  const handlers = usePostSubmissionHandlers<TData, TResponse>(props)

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
        { interval: 200 },
        handleFormSubmit<TData, TResponse>(
          onSubmit,
          (isLoading: boolean) => {
            setIsLoading(isLoading)
            setLoading(isLoading)
          },
          handlers.onSubmitSuccess,
          handlers.onSubmitError,
          handlers.onSubmitOptimistic,
        ),
      )}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
      showInlineError
    >
      {children}
    </AutoForm>
  )
}
