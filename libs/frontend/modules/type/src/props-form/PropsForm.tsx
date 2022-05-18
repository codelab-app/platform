import {
  IInterfaceType,
  IPropData,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Subscription } from 'react-hook-form/dist/utils/createSubject'
import { PropsFields } from './PropsFields'

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
    const { handleSubmit, watch } = form
    const fields = [...interfaceType.fields.values()]

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [watch, autosave, debouncedSave])

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <PropsFields context={context} field={field} form={form} />
        ))}
      </form>
    )
  },
)
