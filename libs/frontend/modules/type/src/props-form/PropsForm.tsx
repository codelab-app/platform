import {
  IInterfaceType,
  IPropData,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'
<<<<<<< HEAD
import { PropsField } from './PropsField'
=======
import { PropsFields } from './PropsFields'
>>>>>>> f5ba5373f (feat: merge commit)

export type PropsFormProps = {
  interfaceType: IInterfaceType
  initialValue?: IPropData
  onSubmit: (values: IPropData) => IPropData
  autosave?: boolean
  context?: IPropsFieldContext
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const PropsForm = observer<PropsFormProps>(
  ({ interfaceType, initialValue, onSubmit, autosave, context }) => {
    const form = useForm({ defaultValues: initialValue })
    const { control, formState, handleSubmit } = form
    const watchedData = useWatch({ control, defaultValue: initialValue })
    const fields = [...interfaceType.fields.values()]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSave = useCallback(
      debounce(() => {
        handleSubmit(onSubmit)()
      }, 200),
      [onSubmit],
    )

    useDeepCompareEffect(() => {
      if (autosave && formState.isDirty) {
        debouncedSave()
      }
    }, [autosave, watchedData])

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <PropsFields context={context} field={field} form={form} />
        ))}
      </form>
    )
  },
)
