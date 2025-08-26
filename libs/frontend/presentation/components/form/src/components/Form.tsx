'use client'

import type { FormProps } from '@codelab/frontend-abstract-types'
import type { Nullable, ObjectLike } from '@codelab/shared-abstract-types'
import type { TSchema } from '@sinclair/typebox'
import type { JSONSchemaType } from 'ajv'
import type { ReactElement } from 'react'

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import {
  connectUniformSubmitRef,
  createBridge,
} from '@codelab/frontend-shared-utils'
import { throttle } from 'radash'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge, filterDOMProps } from 'uniforms'
import { AutoForm } from 'uniforms-antd'

import { useAsyncHandler, usePostSubmit } from './utils'

export const FormBridgeContext = createContext<{
  bridge: Nullable<Bridge>
  schema: JSONSchemaType<ObjectLike> | TSchema
  setBridge(bridge: Bridge): void
}>({
  schema: {} as JSONSchemaType<ObjectLike> | TSchema,
  bridge: null,
  setBridge: (bridge) => null,
})

export const useFormBridge = () => {
  return useContext(FormBridgeContext)
}

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  filterDOMProps.register('nullable')
  filterDOMProps.register('isTypedProp')
  filterDOMProps.register('forbiddenValues')
  filterDOMProps.register('decimal')
  filterDOMProps.register('defaultExpression')
  filterDOMProps.register('oneOf')
  filterDOMProps.register('unionType')

  const Form = <TData extends ObjectLike, TResponse = unknown>(
    props: React.PropsWithChildren<FormProps<TData, TResponse>>,
  ): ReactElement<unknown> => {
    const {
      autosave = false,
      children,
      cssString,
      disabled,
      model,
      modelTransform,
      onChange,
      onChangeModel,
      onSubmit,
      onSubmitOptimistic = () => {
        return
      },
      schema,
      submitField,
      submitRef,
      uiKey,
    } = props

    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge<TData>(schema, model),
    )

    useEffect(() => {
      setBridge(
        schema instanceof Bridge ? schema : createBridge<TData>(schema, model),
      )
    }, [schema])

    const modelRef = useRef(model)

    // Keep modelRef.current synchronized with the model prop
    // This is necessary because:
    // 1. When autosave=true, we use modelRef.current to prevent re-renders
    // 2. But we still need to reflect external updates to the model prop
    // 3. Without this effect, modelRef would become stale when model changes
    useEffect(() => {
      modelRef.current = model
    }, [model])

    const postSubmit = usePostSubmit<TData, TResponse>(props)
    const asyncHandler = useAsyncHandler<TData, TResponse>()
    const submit = asyncHandler(onSubmit, onSubmitOptimistic)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <FormBridgeContext value={{ bridge, setBridge, schema }}>
          <BaseAutoForm<TData>
            autosave={autosave}
            autosaveDelay={500}
            data-testid={CuiTestId.cuiForm(uiKey)}
            disabled={disabled}
            errorsField={() => null}
            model={autosave ? modelRef.current : model}
            modelTransform={modelTransform}
            onChange={onChange}
            onChangeModel={onChangeModel}
            onSubmit={throttle({ interval: 200 }, (formData) =>
              submit(formData as TData)
                .then(postSubmit.onSubmitSuccess)
                .catch(postSubmit.onSubmitError),
            )}
            ref={connectUniformSubmitRef(submitRef)}
            schema={bridge}
            showInlineError
            submitField={submitField}
          >
            {children}
          </BaseAutoForm>
        </FormBridgeContext>
      </div>
    )
  }

  return Form
}

export const Form = withAutoForm(AutoForm)
