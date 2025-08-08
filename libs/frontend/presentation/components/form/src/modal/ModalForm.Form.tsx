'use client'

import type { FormProps } from '@codelab/frontend-abstract-types'
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { ReactElement } from 'react'

import { Space } from '@codelab/frontend-presentation-components-space'
import {
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend-shared-utils'
import { Skeleton } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'

import { useAsyncHandler, usePostSubmit } from '../components/utils'
import { ModalFormContext } from './modal-form.context'

export type OptimisticFormProps<TData, TResponse> = React.PropsWithChildren<
  // Only standalone form should have `uiKey`
  Omit<FormProps<TData, TResponse>, 'submitRef' | 'uiKey'>
>

export const Form = <TData extends ObjectLike, TResponse = unknown>(
  props: OptimisticFormProps<TData, TResponse>,
): ReactElement<unknown> => {
  const {
    autosave = false,
    children,
    isLoading,
    model,
    modelTransform,
    onChange,
    onChangeModel,
    onSubmit,
    schema,
  } = props

  const { setIsLoading, submitRef } = useContext(ModalFormContext)
  const postSubmit = usePostSubmit<TData, TResponse>(props)
  const asyncHandler = useAsyncHandler<TData, TResponse>(setIsLoading)
  const submit = asyncHandler(onSubmit, props.onSubmitOptimistic)

  const [bridge, setBridge] = useState(
    schema instanceof Bridge ? schema : createBridge<TData>(schema),
  )

  useEffect(() => {
    setBridge(schema instanceof Bridge ? schema : createBridge<TData>(schema))
  }, [schema])

  return (
    <>
      {isLoading ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton.Input active block />
          <Skeleton.Button active block />
        </Space>
      ) : (
        <AutoForm<TData>
          autosave={autosave}
          autosaveDelay={250}
          model={model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={(formData) =>
            submit(formData as TData)
              .then(postSubmit.onSubmitSuccess)
              .catch(postSubmit.onSubmitError)
          }
          ref={connectUniformSubmitRef(submitRef)}
          schema={bridge}
          showInlineError
        >
          {children}
        </AutoForm>
      )}
    </>
  )
}
