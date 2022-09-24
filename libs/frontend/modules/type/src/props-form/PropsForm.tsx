import { FormProps, SubmitRef } from '@codelab/frontend/abstract/types'
import {
  connectUniformSubmitRef,
  handleFormSubmit,
  SetIsLoading,
} from '@codelab/frontend/view/components'
import {
  IField,
  IInterfaceType,
  IPropData,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import { Form } from 'antd'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import { DeepPartial, useForm } from 'react-hook-form'
import { Subscription } from 'react-hook-form/dist/utils/createSubject'
import { PropsFields } from './PropsFields'

export interface PropsFormProps extends SubmitRef {
  interfaceType?: IInterfaceType
  model?: IPropData
  onSubmit: (values: IPropData) => Promise<IPropData | void>
  autosave?: boolean
  context?: IPropsFieldContext
  setIsLoading?: SetIsLoading
  cssString?: CSSInterpolation
  onSubmitError?: FormProps<IPropData, IPropData>['onSubmitError']
  onSubmitSuccess?: FormProps<IPropData, IPropData>['onSubmitSuccess']
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const PropsForm = observer<PropsFormProps>(
  ({
    interfaceType,
    model,
    onSubmit,
    autosave,
    context,
    setIsLoading,
    submitRef,
    onSubmitError,
    cssString,
    onSubmitSuccess,
  }) => {
    const form = useForm({ defaultValues: model })
    const { handleSubmit, watch } = form

    const fields: Array<IField> = interfaceType
      ? [...interfaceType.fields.values()]
      : []

    const debouncedSave = useCallback(
      debounce(() => handleSubmit(onSubmit)(), 500),
      [onSubmit],
    )

    useEffect(() => {
      let subscription: Nullish<Subscription> = null

      if (autosave) {
        subscription = watch(debouncedSave)
      }

      return () => subscription?.unsubscribe()
    }, [watch, debouncedSave])

    return (
      <div
        css={css`
          ${cssString}
        `}
      >
        <Form
          layout="vertical"
          noValidate
          onFinish={() =>
            handleFormSubmit<DeepPartial<IPropData>, IPropData>(
              onSubmit,
              setIsLoading,
              onSubmitSuccess,
              onSubmitError,
            )(form.getValues())
          }
          ref={connectUniformSubmitRef(submitRef)}
        >
          {fields.map((field) => (
            <PropsFields context={context} field={field} form={form} />
          ))}
        </Form>
      </div>
    )
  },
)
