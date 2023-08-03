import { Form, handleFormSubmit } from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'
import { observer } from 'mobx-react-lite'
import { mergeDeepRight } from 'ramda'
import React, { useMemo, useRef } from 'react'
import { schemaTransformer } from './type-schema.factory'
import type { InterfaceFormProps } from './types'
import { Maybe } from '@codelab/shared/abstract/types'
import { SubmitController } from '@codelab/frontend/abstract/types'

/**
 * Uniforms form generated by an {@link IInterfaceType}
 */
export const InterfaceForm = observer(
  <TData, TResponse = unknown>({
    autosave,
    children,
    initialSchema,
    interfaceType,
    model,
    onChange,
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    onValidate,
    setIsLoading,
    submitField,
    submitRef,
  }: React.PropsWithChildren<InterfaceFormProps<TData, TResponse>>) => {
    const formSchema = useMemo(() => {
      const typeTreeSchema = schemaTransformer.transform(interfaceType)

      return mergeDeepRight(initialSchema ?? {}, typeTreeSchema)
    }, [interfaceType, interfaceType.fields, initialSchema])

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
        onValidate={onValidate}
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
