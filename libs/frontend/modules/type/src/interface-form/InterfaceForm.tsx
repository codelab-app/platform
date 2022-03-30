import { Form, handleFormSubmit } from '@codelab/frontend/view/components'
import { Spin } from 'antd'
import { autorun } from 'mobx'
import { mergeDeepRight } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { DeepPartial } from 'uniforms'
import { TypeSchemaFactory } from '../store'
import { InterfaceFormProps } from './types'
import { getUiProperties } from './ui-properties'

const transformer = new TypeSchemaFactory({
  extraProperties: getUiProperties,
})

/**
 * Uniforms form generated by an {@link IInterfaceType}
 */
export const InterfaceForm = <TData,>({
  interfaceType,
  children,
  model,
  onSubmit,
  initialSchema,
  onChange,
  onSubmitError,
  onSubmitSuccess,
  submitRef,
  setIsLoading,
}: React.PropsWithChildren<InterfaceFormProps<TData>>) => {
  const initialSchemaRef = useRef(initialSchema)
  const [formSchema, setFormSchema] = useState(initialSchema ?? {})
  console.log({ formSchema, initialSchema, interfaceType })

  useEffect(
    () =>
      autorun(() => {
        const typeTreeSchema = transformer.transform(interfaceType)

        console.log({ typeTreeSchema })

        setFormSchema(mergeDeepRight(initialSchemaRef.current, typeTreeSchema))
      }),
    [interfaceType],
  )

  if (!formSchema) {
    return null
  }

  return (
    <Form
      model={model}
      onChange={onChange}
      onSubmit={handleFormSubmit<DeepPartial<TData>>(
        onSubmit as any,
        setIsLoading,
        onSubmitSuccess as any,
        onSubmitError as any,
      )}
      onSubmitError={onSubmitError}
      onSubmitSuccess={onSubmitSuccess}
      schema={formSchema}
      submitRef={submitRef}
    >
      {children}
    </Form>
  )
}

InterfaceForm.displayName = 'InterfaceForm'
