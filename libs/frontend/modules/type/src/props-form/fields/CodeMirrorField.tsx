import {
  CodeMirrorEditor,
  contextCompletionOptions,
  typeCompletionOptions,
} from '@codelab/frontend/view/components'
import { IField, IPropsFieldContext } from '@codelab/shared/abstract/core'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

export interface CodeMirrorFieldProps {
  field: IField
  form: UseFormReturn
  context?: IPropsFieldContext
}

export const CodeMirrorField = ({
  field,
  form,
  context,
}: CodeMirrorFieldProps) => (
  <Controller
    control={form.control}
    name={field.key}
    render={(control) => (
      <CodeMirrorEditor
        defaultCompletionOptions={typeCompletionOptions(field.type.current)}
        onBlur={control.field.onBlur}
        onChange={control.field.onChange}
        templateCompletionOptions={contextCompletionOptions(
          context?.autocomplete,
        )}
        title={field.name}
        value={control.field.value}
      />
    )}
  />
)
