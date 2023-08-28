import type { IPrimitiveType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { UiPropertiesFn } from '../types'

export const primitiveTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type,
  context,
) => {
  const autocomplete = context?.autocomplete
    ? createAutoCompleteOptions(context.autocomplete)
    : undefined

  if (type.primitiveKind === IPrimitiveTypeKind.String) {
    return {
      uniforms: {
        component: CodeMirrorField({ customOptions: autocomplete }),
      },
    }
  }

  return {
    uniforms: {
      component: ToggleExpressionField({
        autocomplete,
        onToggle: (showExpression, { field, onChange, value }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? `{{${value ?? field.default ?? ''}}}`)
          } else {
            onChange(lastValue ?? field.default)
          }
        },
      }),
    },
  }
}
