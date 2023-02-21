import type { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { css } from '@emotion/react'
import { equals } from 'ramda'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm as BaseAutoForm } from 'uniforms-antd'
import {
  connectUniformSubmitRef,
  createBridge,
  createValidator,
} from '../hooks/uniformUtils'
import { useFormContext } from '../providers'

export const withAutoForm = (AutoForm: typeof BaseAutoForm) => {
  const Form = <TData, TResponse = unknown>({
    cssString,
    submitRef,
    onSubmitSuccess = [],
    onSubmitError = [],
    autosave = false,
    schema,
    onSubmit = (model: TData) => Promise.resolve(),
    children,
    model,
    onChangeModel,
    onChange,
    submitField,
  }: React.PropsWithChildren<FormProps<TData, TResponse>>): ReactElement => {
    const context = useFormContext()

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema, context),
    )

    useEffect(() => {
      setBridge(
        schema instanceof Bridge ? schema : createBridge(schema, context),
      )
    }, [schema])

    const lastSubmitted = useRef<typeof model>({})
    const modelRef = useRef(model)

    // This prevents a new model update to interfere while user is typing.
    // This also enables the form model to be updated when the
    // model is updated outside the form (e.g. props inspector)
    useEffect(() => {
      if (!equals(model, lastSubmitted.current)) {
        modelRef.current = model
      }
    }, [model])

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <AutoForm<TData>
          autosave={autosave}
          autosaveDelay={500}
          model={modelRef.current}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={(formData) => {
            // apply default values from the schema for the formData
            // https://ajv.js.org/guide/modifying-data.html#assigning-defaults
            const validate = createValidator(schema)
            validate(formData)

            const submitResults = onSubmit(formData as TData)

            return submitResults
              .then((result) => {
                lastSubmitted.current = formData

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
        </AutoForm>
      </div>
    )
  }

  return Form
}

export const Form = withAutoForm(BaseAutoForm)
