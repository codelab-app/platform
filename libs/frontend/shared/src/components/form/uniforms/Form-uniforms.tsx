import React, { ReactElement, useEffect, useState } from 'react'
import { Bridge } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { callbackWithParams } from '../../../utils'
import { FormUniformsProps } from './Form-uniforms--types'
import { connectUniformSubmitRef, createBridge } from './uniformUtils'

export const FormUniforms = <TData extends any>({
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
      onSubmit={(formData: TData) => {
        const result = onSubmit(formData)

        if (!result) {
          return result
        }

        return result
          .then((r: any) => {
            console.log(r)

            if (typeof result === 'object') {
              callbackWithParams(onSubmitSuccess, r)
            }
          })
          .catch((err: any) => {
            console.error(err)

            if (typeof result === 'object') {
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
