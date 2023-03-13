import type { IPrimitiveType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  ToggleExpressionField,
} from '@codelab/frontend/view/components'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { UiPropertiesFn } from '../types'

export const primitiveTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type,
) => {
  if (type.primitiveKind === IPrimitiveTypeKind.String) {
    return {
      uniforms: {
        component: CodeMirrorField(),
      },
    }
  }

  return {
    uniforms: {
      component: ToggleExpressionField({
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
