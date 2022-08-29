import {
  CodeMirrorEditor,
  stateOptions,
  typeOptions,
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
        customOptions={stateOptions(context?.autocomplete)}
        defaultOptions={typeOptions(field.type.current)}
        onBlur={control.field.onBlur}
        onChange={control.field.onChange}
        title={field.name}
        value={control.field.value}
      />
    )}
  />
)
