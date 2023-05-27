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
} from '../hooks/uniformUtils.hook'

// we migrated to antd major version 5 before all the packages were ready.
// currently uniforms-antd is not compatible with antd 5, there is an issue
// exists for this: https://github.com/vazco/uniforms/issues/1259.
// once it is resolved, we can remove this temporal fix.
export const inlineFieldCssFix = `
  & .ant-row {
    display: flex;
    flex-direction: column;
  }

  & .ant-form-item-label {
    align-self: baseline;
  }
`

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
          ${inlineFieldCssFix}
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
