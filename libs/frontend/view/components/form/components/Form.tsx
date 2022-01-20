import { FormProps } from '@codelab/frontend/abstract/props'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { isObjectLike } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { connectUniformSubmitRef, createBridge } from '../hooks/uniformUtils'

export const Form = <TData,>({
  submitRef,
  onSubmitSuccess,
  onSubmitError,
  autosave = false,
  schema,
  onSubmit,
  children,
  model,
}: React.PropsWithChildren<FormProps<TData>>): ReactElement => {
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
      onSubmit={(formData) => {
        const result = onSubmit(formData as TData)

        if (!result) {
          return result
        }

        return result
          .then((r: any) => {
            if (isObjectLike(result)) {
              callbackWithParams(onSubmitSuccess, r)
            }
          })
          .catch((err: Error) => {
            console.error(err)

            if (isObjectLike(result)) {
              callbackWithParams(onSubmitError, err)
            }
          })
      }}
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
    >
      {children}
    </AutoForm>
  )
}
