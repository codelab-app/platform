import React, { ReactElement, useRef } from 'react'
import { AutoForm } from 'uniforms-antd'
import { Bridge } from 'uniforms'
import { JsonSchemaUniFormProps } from './Form-jsonSchema--types'
import { connectUniformSubmitRef, createBridge } from './uniformUtils'
import { callbackWithParams } from '../../../utils'

export const JsonSchemaUniForm = <TData extends Record<string, unknown>>({
  submitRef,
  onSubmitSuccess,
  onSubmitError,
  schema,
  onSubmit,
  children,
  ...props
}: React.PropsWithChildren<JsonSchemaUniFormProps<TData>>): ReactElement => {
  const bridgeRef = useRef(
    schema instanceof Bridge ? schema : createBridge(schema),
  )

  return (
    <AutoForm<TData>
      ref={connectUniformSubmitRef(submitRef)}
      schema={bridgeRef.current}
      onSubmit={(formData: TData) => {
        // @todo: Remove any from formData
        const result = onSubmit(formData as any)

        if (typeof result === 'object') {
          return result
            .then((r: any) => {
              callbackWithParams(onSubmitSuccess, r)
            })
            .catch((err: any) => {
              callbackWithParams(onSubmitError, err)
            })
        }

        return result
      }}
      {...props}
    >
      {children}
    </AutoForm>
  )
}
