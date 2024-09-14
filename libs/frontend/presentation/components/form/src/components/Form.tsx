'use client'

import type { FormProps } from '@codelab/frontend/abstract/types'
import {
  callbackWithParams,
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend/shared/utils'
import { Cui } from '@codelab/frontend-application-shared-data'
import { throttle } from 'radash'
import type { ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'

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
    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema))
    }, [schema])

    const modelRef = useRef(model)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <BaseAutoForm<TData>
          autosave={autosave}
          autosaveDelay={500}
          data-cy={Cui.cuiForm(uiKey)}
          errorsField={() => <ErrorsField />}
          model={autosave ? modelRef.current : model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={throttle({ interval: 200 }, (formData) => {
            const submitResults = onSubmit(formData as TData)

            return submitResults
              .then((result) => {
                if (result) {
                  callbackWithParams(onSubmitSuccess, result)
                }
              })
              .catch((error) => {
                console.error(error)

                callbackWithParams(onSubmitError, error)
              })
          })}
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
