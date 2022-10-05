import { IAnyType, IPrimitiveType } from '@codelab/frontend/abstract/core'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const primitiveTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type: IAnyType,
) => {
  // TODO: default is a checkbox, could have a dynamic input to apply data binding expression
  if (type.name === IPrimitiveTypeKind.Boolean) {
    return {}
  }

  if (type.name === IPrimitiveTypeKind.String) {
    return {
      uniforms: {
        component: CodeMirrorField(),
      },
    }
  }

  /**
   * for float, integer
   * default height is 150px
   *
   * change to auto to make it one line
   * since most numbers are oneline?
   */
  return {
    uniforms: {
      component: CodeMirrorField({
        height: 'auto',
        onChange: (value, uniformsOnChange) => {
          // const castedValue = Number(value)
          // pass the original value back if not a number
          uniformsOnChange(value)
        },
      }),
    },
  }
}
