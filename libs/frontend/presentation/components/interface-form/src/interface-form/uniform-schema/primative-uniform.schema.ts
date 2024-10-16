import type { IPrimitiveTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import {
  CodeMirrorField,
  ToggleExpressionField,
} from '@codelab/frontend-presentation-components-form'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'

export const primitiveTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IPrimitiveTypeModel
> = (type, autocomplete) => {
  return type.primitiveKind === IPrimitiveTypeKind.String
    ? {
        uniforms: {
          component: CodeMirrorField({ customOptions: autocomplete }),
        },
      }
    : {
        uniforms: {
          component: ToggleExpressionField({
            autocomplete,
            onToggle: (
              showExpression,
              { field, onChange, value },
              lastValue,
            ) => {
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
