import { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import React, { ReactElement, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'

export const Form = <TData, TResponse = unknown>({
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

  return (
    <AutoForm<TData>
      autosave={autosave}
      autosaveDelay={500}
      model={model}
      onChange={onChange}
      onChangeModel={onChangeModel}
      onSubmit={(formData) => {
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
  )
}
