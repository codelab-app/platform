import { Form, handleFormSubmit } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { mergeDeepRight } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { schemaTransformer } from './type-schema.factory'
import { InterfaceFormProps } from './types'

/**
 * Uniforms form generated by an {@link IInterfaceType}
 */
export const InterfaceForm = observer(
  <TData, TResponse = unknown>({
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
    autosave,
    context,
    submitField,
  }: React.PropsWithChildren<InterfaceFormProps<TData, TResponse>>) => {
    const initialSchemaRef = useRef(initialSchema)
    const [formSchema, setFormSchema] = useState(initialSchema ?? {})

    useEffect(
      () =>
        autorun(() => {
          const typeTreeSchema = schemaTransformer.transform(
            interfaceType,
            context,
          )

          setFormSchema(
            mergeDeepRight(initialSchemaRef.current ?? {}, typeTreeSchema),
          )
        }),
      [interfaceType],
    )

    return (
      <Form
        autosave={autosave}
        model={model}
        onChange={onChange}
        onSubmit={handleFormSubmit<TData, TResponse>(
          onSubmit,
          setIsLoading,
          onSubmitSuccess,
          onSubmitError,
        )}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={formSchema as JSONSchemaType<unknown>}
        submitField={submitField}
        submitRef={submitRef}
      >
        {children}
      </Form>
    )
  },
)

InterfaceForm.displayName = 'InterfaceForm'
