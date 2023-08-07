import type { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import {
  connectUniformSubmitRef,
  createBridge,
  createValidator,
} from '../hooks/uniformUtils.hook'
import { useFormContext } from '../providers'
import { bypassExpressionErrors } from './utils'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData, TResponse = unknown>({
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
    const { selectedNode } = useFormContext()
    const state = selectedNode?.current.store.current

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema, state),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema, state))
    }, [schema])

    const modelRef = useRef(model)
    // apply default values from the schema for the formData
    // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
    const validate = createValidator(schema, state)

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
          onValidate={bypassExpressionErrors}
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
