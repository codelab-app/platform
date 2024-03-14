import type { FormProps } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'
import {
  connectUniformSubmitRef,
  createBridge,
} from '../hooks/uniformUtils.hook'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData, TResponse = unknown>({
    autosave = false,
    children,
    cssString,
    key,
    model,
    modelTransform,
    onChange,
    onChangeModel,
    onSubmit = (_model: TData) => Promise.resolve(),
    onSubmitError = [],
    onSubmitSuccess = [],
    schema,
    submitField,
    submitRef,
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
          data-cy={CY_DATA.cuiForm(key)}
          errorsField={() => <ErrorsField />}
          model={autosave ? modelRef.current : model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={(formData) => {
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
          }}
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
