import {
  Form,
  handleFormSubmit,
} from '@codelab/frontend-presentation-view/components/form'
import type { JSONSchemaType } from 'ajv'
import { observer } from 'mobx-react-lite'
import { mergeDeepRight } from 'ramda'
import React, { useMemo } from 'react'
import { schemaTransformer } from './type-schema.factory'
import type { InterfaceFormProps } from './types'

/**
 * Uniforms form generated by an {@link IInterfaceType}
 */
export const InterfaceForm = observer(
  <TData, TResponse>({
    autosave,
    children,
    context,
    initialSchema,
    interfaceType,
    model,
    onChange,
    onSubmit,
    onSubmitError,
    onSubmitSuccess,
    setIsLoading,
    submitField,
    submitRef,
  }: React.PropsWithChildren<InterfaceFormProps<TData, TResponse>>) => {
    const formSchema = useMemo(() => {
      const typeTreeSchema = schemaTransformer.transform(interfaceType, context)

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
        schema={formSchema as JSONSchemaType<unknown>}
        submitField={submitField}
        submitRef={submitRef}
        // TODO: Need to find a way to have a domain key in this case
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        uiKey={'interface-form' as any}
      >
        {children}
      </Form>
    )
  },
)

InterfaceForm.displayName = 'InterfaceForm'
