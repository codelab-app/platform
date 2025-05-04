'use client'

import type { FormProps } from '@codelab/frontend/abstract/types'
import type { ReactElement } from 'react'
import type { UnknownObject } from 'uniforms'

import {
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend/shared/utils'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { throttle } from 'radash'
import { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge, filterDOMProps } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'

import { useAsyncHandler, usePostSubmit } from './utils'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  filterDOMProps.register('nullable')

  const Form = <TData extends UnknownObject, TResponse = unknown>(
    props: React.PropsWithChildren<FormProps<TData, TResponse>>,
  ): ReactElement<unknown> => {
    const {
      autosave = false,
      children,
      cssString,
      model,
      modelTransform,
      onChange,
      onChangeModel,
      onSubmit,
      onSubmitOptimistic = () => {
        return
      },
      schema,
      submitField,
      submitRef,
      uiKey,
    } = props

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge<TData>(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge<TData>(schema))
    }, [schema])

    const modelRef = useRef(model)

    // Keep modelRef.current synchronized with the model prop
    // This is necessary because:
    // 1. When autosave=true, we use modelRef.current to prevent re-renders
    // 2. But we still need to reflect external updates to the model prop
    // 3. Without this effect, modelRef would become stale when model changes
    useEffect(() => {
      modelRef.current = model
    }, [model])

    const postSubmit = usePostSubmit<TData, TResponse>(props)
    const asyncHandler = useAsyncHandler<TData, TResponse>()
    const submit = asyncHandler(onSubmit, onSubmitOptimistic)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <BaseAutoForm<TData>
          autosave={autosave}
          autosaveDelay={500}
          data-testid={CuiTestId.cuiForm(uiKey)}
          errorsField={() => <ErrorsField />}
          model={autosave ? modelRef.current : model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={throttle({ interval: 200 }, (formData) =>
            submit(formData as TData)
              .then(postSubmit.onSubmitSuccess)
              .catch(postSubmit.onSubmitError),
          )}
          ref={connectUniformSubmitRef(submitRef)}
          schema={bridge}
          showInlineError
          submitField={submitField}
        >
          {children}
        </BaseAutoForm>
      </div>
    )
  }

  return Form
}

export const Form = withAutoForm(AutoForm)
