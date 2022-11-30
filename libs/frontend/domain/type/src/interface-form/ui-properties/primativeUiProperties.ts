import { IAnyType, IPrimitiveType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  ToggleExpressionField,
} from '@codelab/frontend/view/components'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const primitiveTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type: IAnyType,
) => {
  if (type.name === IPrimitiveTypeKind.String) {
    return {
      uniforms: {
        component: CodeMirrorField(),
      },
    }
  }

  return {
    uniforms: {
      component: ToggleExpressionField({
        onToggle: (showExpression, { value, field, onChange }, lastValue) => {
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
