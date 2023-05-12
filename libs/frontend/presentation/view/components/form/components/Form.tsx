import type { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { css } from '@emotion/react'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import {
  connectUniformSubmitRef,
  createBridge,
  createValidator,
} from '../hooks/uniformUtils'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData, TResponse = unknown>({
    allowExpressions = false,
    autosave = false,
    children,
    cssString,
    'data-testid': dataTestId,
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
      schema instanceof Bridge
        ? schema
        : createBridge(schema, allowExpressions),
    )

    useEffect(() => {
      setBridge(
        schema instanceof Bridge
          ? schema
          : createBridge(schema, allowExpressions),
      )
    }, [schema])

    const modelRef = useRef(model)
    // apply default values from the schema for the formData
    // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
    const validate = createValidator(schema)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <BaseAutoForm<TData>
          autosave={autosave}
          autosaveDelay={500}
          data-testid={dataTestId}
          model={autosave ? modelRef.current : model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={(formData) => {
            validate(formData)

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
