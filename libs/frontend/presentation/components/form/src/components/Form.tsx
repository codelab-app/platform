'use client'

import type { FormProps } from '@codelab/frontend/abstract/types'
import type { ReactElement } from 'react'

import {
  connectUniformSubmitRef,
  createBridge,
  logging,
} from '@codelab/frontend/shared/utils'
import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { throttle } from 'radash'
import { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'

import { useAsyncHandler, usePostSubmit } from './utils'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData, TResponse = unknown>(
    props: React.PropsWithChildren<FormProps<TData, TResponse>>,
  ): ReactElement => {
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

    logging.useModelDiff('Model', model)

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema))
    }, [schema])

    const renderCount = useRef({ asyncHandler: 0, postSubmit: 0, submit: 0 })
    const postSubmit = usePostSubmit<TData, TResponse>(props)

    useEffect(() => {
      renderCount.current.postSubmit += 1
      console.log(
        `usePostSubmit called ${renderCount.current.postSubmit} times for ${uiKey}`,
      )
    }, [postSubmit, uiKey])

    const asyncHandler = useAsyncHandler<TData, TResponse>()

    useEffect(() => {
      renderCount.current.asyncHandler += 1
      console.log(
        `useAsyncHandler called ${renderCount.current.asyncHandler} times for ${uiKey}`,
      )
    }, [asyncHandler, uiKey])

    const submit = asyncHandler(onSubmit, onSubmitOptimistic)

    useEffect(() => {
      renderCount.current.submit += 1
      console.log(
        `submit function created ${renderCount.current.submit} times for ${uiKey}`,
      )
    }, [submit, uiKey])

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
          model={model}
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
