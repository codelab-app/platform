import { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { css } from '@emotion/react'
import React, { ReactElement, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm as BaseAutoForm } from 'uniforms-antd'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'

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
  }: React.PropsWithChildren<FormProps<TData, TResponse>>): ReactElement => {
    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema))
    }, [schema])

    console.log('render form', autosave)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <AutoForm<TData>
          autosave={autosave}
          autosaveDelay={500}
          model={model}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={(formData) => {
            console.log({ formData })

            const result = onSubmit(formData as TData)

            if (!result) {
              return result
            }

            return result
              .then((r) => {
                if (r) {
                  callbackWithParams(onSubmitSuccess, r as any)
                }
              })
              .catch((err) => {
                console.error(err)

                callbackWithParams(onSubmitError, err)
              })
          }}
          ref={connectUniformSubmitRef(submitRef)}
          schema={bridge}
        >
          {children}
        </AutoForm>
      </div>
    )
  }

  return Form
}

export const Form = withAutoForm(BaseAutoForm)
