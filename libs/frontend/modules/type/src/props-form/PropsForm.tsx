import { IInterfaceType } from '@codelab/shared/abstract/core'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PropsFields } from './props-fields'

export type PropsFormProps = {
  interfaceType: IInterfaceType
  initialValue?: any
  onSubmit: (values: any) => any
  autosave?: boolean
  autocompleteContext?: any
}

type UsePropFormProps = Pick<
  PropsFormProps,
  'autosave' | 'initialValue' | 'onSubmit'
>

const usePropForm = ({
  onSubmit,
  autosave,
  initialValue,
}: UsePropFormProps) => {
  const form = useForm({ defaultValues: initialValue })
  const { control, formState, handleSubmit } = form
  const watchedData = useWatch({ control, defaultValue: initialValue })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(() => {
      handleSubmit(onSubmit)()
    }, 500),
    [onSubmit],
  )

  useDeepCompareEffect(() => {
    if (autosave && formState.isDirty) {
      debouncedSave()
    }
  }, [autosave, watchedData])

  return form
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
    autocompleteContext,
  }) => {
    const form = usePropForm({ onSubmit, initialValue, autosave })
    const fields = [...interfaceType.fields.values()]

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <PropsFields
            autocompleteContext={autocompleteContext}
            field={field}
            form={form}
          />
        ))}
      </form>
    )
  },
)
