import { CodeMirrorField } from '@codelab/frontend/view/components'
import {
  IAnyType,
  IPrimitiveType,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const primativeTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type: IAnyType,
  context: any,
) => {
  if (type.name === IPrimitiveTypeKind.Boolean) {
    return {}
  }

  return {
    uniforms: {
      component: CodeMirrorField({
        customOptions: [],
      }),
    },
  }
}
