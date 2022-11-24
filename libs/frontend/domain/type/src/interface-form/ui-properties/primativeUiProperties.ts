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
        onToggle: (showExpression, { field, onChange }) => {
          if (showExpression) {
            onChange(`{{${field.default}}}`)
          } else {
            onChange(field.default)
          }
        },
      }),
    },
  }
}
