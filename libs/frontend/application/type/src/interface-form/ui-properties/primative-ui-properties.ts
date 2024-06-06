import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { UiPropertiesFn } from '../types'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-view/components/codeMirror'
import {
  CodeMirrorField,
  ToggleExpressionField,
} from '@codelab/frontend-presentation-view/components/form'

export const primitiveTypeUiProperties: UiPropertiesFn<IPrimitiveTypeModel> = (
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
