import {
  DETACHED_ELEMENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
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
} & WithServices<DETACHED_ELEMENT_SERVICE>

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
    detachedElementService,
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

    const detachedElements = [...detachedElementService.elements.values()]

    useDeepCompareEffect(() => {
      if (autosave && form.formState.isDirty) {
        debouncedSave()
      }
    }, [autosave, watchedData])

    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <PropsFields
            autocompleteContext={autocompleteContext}
            detachedElements={detachedElements}
            field={field}
            form={form}
          />
        ))}
      </form>
    )
  },
)
