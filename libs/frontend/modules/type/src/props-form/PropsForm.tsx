import { IInterfaceType } from '@codelab/shared/abstract/core'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PropsField } from './PropsField'

export type PropsFormProps = {
  interfaceType: IInterfaceType
  initialValue?: any
  onSubmit: (values: any) => any
  autosave?: boolean
  autocompleteContext?: any
}

/**
 * Generates a props form with CodeMirror fields for a given {@link InterfaceType}
 */
export const PropsForm = observer<PropsFormProps>(
  ({
    interfaceType,
    initialValue,
    onSubmit,
    autosave,
    autocompleteContext = { hello: 'world' },
  }) => {
    const form = useForm({
      defaultValues: initialValue,
    })

    const fields = [...interfaceType.fields.values()]

    const debouncedSave = useCallback(
      debounce(() => {
        form.handleSubmit(onSubmit)()
        // autosave every 500ms
      }, 500),

      [onSubmit],
    )

    const watchedData = useWatch({
      control: form.control,
      defaultValue: initialValue,
    })

    useDeepCompareEffect(() => {
      if (autosave && form.formState.isDirty) {
        debouncedSave()
      }
    }, [autosave, watchedData])

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <PropsField
            autocompleteContext={autocompleteContext}
            field={field}
            form={form}
          />
        ))}
      </form>
    )
  },
)
