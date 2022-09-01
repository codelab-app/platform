import {
  CodeMirrorEditor,
  stateOptions,
  typeOptions,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  IField,
  IFieldDTO,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

export interface CodeMirrorFieldProps {
  field: IFieldDTO
  form: UseFormReturn
  context?: IPropsFieldContext
  language?: CodeMirrorLanguage
}

export const CodeMirrorField = ({
  field,
  form,
  context,
  language,
}: CodeMirrorFieldProps) => (
  <Controller
    control={form.control}
    name={field.key}
    render={(control) => (
      <CodeMirrorEditor
        customOptions={stateOptions(context?.autocomplete)}
        defaultOptions={typeOptions(field.type.current)}
        language={language}
        onBlur={control.field.onBlur}
        onChange={control.field.onChange}
        title={field.name}
        value={control.field.value}
      />
    )}
  />
)
