import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { isObjectLike } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { FormUniformsProps } from './Form-uniforms--types'
import { connectUniformSubmitRef, createBridge } from './uniformUtils'

export const FormUniforms = <TData,>({
  submitRef,
  onSubmitSuccess,
  onSubmitError,
  schema,
  onSubmit,
  children,
  ...props
}: React.PropsWithChildren<FormUniformsProps<TData>>): ReactElement => {
  const [bridge, setBridge] = useState(
    schema instanceof Bridge ? schema : createBridge(schema),
  )

  useEffect(() => {
    setBridge(schema instanceof Bridge ? schema : createBridge(schema))
  }, [schema])

  return (
    <AutoForm<TData>
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridge}
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
      {...props}
    >
      {children}
    </AutoForm>
  )
}
