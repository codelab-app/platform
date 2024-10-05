'use client'

import type { FormProps } from '@codelab/frontend/abstract/types'
import type { ReactElement } from 'react'

import {
  callbackWithParams,
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend/shared/utils'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { throttle } from 'radash'
import { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'

import { usePostSubmit, useSubmit } from './utils'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData, TResponse = unknown>({
    autosave = false,
    children,
    cssString,
    model,
    modelTransform,
    onChange,
    onChangeModel,
    onSubmit,
    onSubmitError = [],
    onSubmitSuccess = [],
    schema,
    submitField,
    submitRef,
    uiKey,
  }: React.PropsWithChildren<FormProps<TData, TResponse>>): ReactElement => {
    const { setLoading } = useLoading()

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema))
    }, [schema])

    const modelRef = useRef(model)

    const postSubmit = usePostSubmit<TData, TResponse>({
      onSubmitError,
      onSubmitSuccess,
    })

    const submit = useSubmit<TData, TResponse>(
      onSubmit,
      (isLoading: boolean) => {
        setLoading(isLoading)
      },
    )

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
            submit(formData)
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
