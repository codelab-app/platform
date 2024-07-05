import type { FormProps } from '@codelab/frontend/abstract/types'
import { callbackWithParams } from '@codelab/frontend/shared/utils'
import { CY_DATA } from '@codelab/frontend-application-shared-data'
import throttle from 'lodash/throttle'
import type { ReactElement } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { Bridge, type UnknownObject } from 'uniforms'
import { AutoForm, ErrorsField } from 'uniforms-antd'
import {
  connectUniformSubmitRef,
  createBridge,
} from '../hooks/uniformUtils.hook'

export const withAutoForm = (BaseAutoForm: typeof AutoForm) => {
  const Form = <TData extends UnknownObject, TResponse = unknown>({
    autosave = false,
    children,
    cssString,
    model,
    modelTransform,
    onChange,
    onChangeModel,
    onSubmit,
    onSubmitError = [],
    onSubmitSuccess = [],
    schema,
    submitField,
    submitRef,
    uiKey,
  }: React.PropsWithChildren<FormProps<TData, TResponse>>): ReactElement => {
    const [bridge, setBridge] = useState(
      schema instanceof Bridge ? schema : createBridge(schema),
    )

    useEffect(() => {
      setBridge(schema instanceof Bridge ? schema : createBridge(schema))
    }, [schema])

    const modelRef = useRef(model)

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <BaseAutoForm<TData>
          autosave={autosave}
          autosaveDelay={250}
          data-cy={CY_DATA.cuiForm(uiKey).cyData}
          errorsField={() => <ErrorsField />}
          model={autosave ? modelRef.current : model}
          modelTransform={modelTransform}
          onChange={onChange}
          onChangeModel={onChangeModel}
          onSubmit={throttle((formData) => {
            const submitResults = onSubmit(formData as TData)

            return submitResults
              .then((result) => {
                if (result) {
                  callbackWithParams(onSubmitSuccess, result)
                }
              })
              .catch((error) => {
                console.error(error)

                callbackWithParams(onSubmitError, error)
              })
          }, 200)}
          ref={connectUniformSubmitRef(submitRef)}
          schema={bridge}
          showInlineError
          submitField={submitField}
        >
          {children}
        </BaseAutoForm>
      </div>
    )
  }

  return Form
}

export const Form = withAutoForm(AutoForm)
