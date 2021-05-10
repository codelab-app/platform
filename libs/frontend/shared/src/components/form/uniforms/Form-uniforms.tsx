import React, { ReactElement, useRef } from 'react'
import { Bridge, DeepPartial } from 'uniforms'
import { AutoForm } from 'uniforms-antd'
import { callbackWithParams } from '../../../utils'
import { FormUniformsProps } from './Form-uniforms--types'
import { connectUniformSubmitRef, createBridge } from './uniformUtils'

export const FormUniforms = <TData extends Record<string, unknown>>({
  submitRef,
  onSubmitSuccess,
  onSubmitError,
  schema,
  onSubmit,
  children,
  ...props
}: React.PropsWithChildren<FormUniformsProps<TData>>): ReactElement => {
  const bridgeRef = useRef(
    schema instanceof Bridge ? schema : createBridge(schema),
  )

  return (
    <AutoForm<TData>
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridgeRef.current}
      onSubmit={(formData: DeepPartial<TData>) => {
        const result = onSubmit(formData)

        console.log(result)

        if (!result) {
          return result
        }

        return result
          .then((r: any) => {
            // console.log(r)

            if (typeof result === 'object') {
              callbackWithParams(onSubmitSuccess, r)
            }
          })
          .catch((err: any) => {
            console.log(err)

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
