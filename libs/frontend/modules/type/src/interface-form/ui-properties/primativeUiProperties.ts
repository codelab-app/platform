import {
  CodeMirrorField,
  createAutoCompleteOptions,
} from '@codelab/frontend/view/components'
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
  // TODO: default is a checkbox, could have a dynamic input to apply data binding expression
  if (type.name === IPrimitiveTypeKind.Boolean) {
    return {}
  }

  return {
    uniforms: {
      component: CodeMirrorField({
        customOptions: createAutoCompleteOptions(context?.autocomplete),
      }),
    },
  }
}
