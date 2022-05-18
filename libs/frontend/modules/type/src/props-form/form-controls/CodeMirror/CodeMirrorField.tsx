import { Controller } from 'react-hook-form'
import { FieldProps } from '../Field'
import {
  contextCompletionOptions,
  typeCompletionOptions,
} from './codemirror-extensions'
import { CodeMirrorInput } from './CodeMirrorInput'

export const CodeMirrorField = ({ field, form, context }: FieldProps) => (
  <Controller
    control={form.control}
    name={field.key}
    render={(control) => (
      <CodeMirrorInput
        defaultCompletionOptions={typeCompletionOptions(field.type.current)}
        onBlur={control.field.onBlur}
        onChange={control.field.onChange}
        templateCompletionOptions={contextCompletionOptions(
          context?.autocomplete || {},
        )}
        value={control.field.value}
      />
    )}
  />
)
