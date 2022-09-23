import {
  CodeMirrorField,
  stateOptions,
} from '@codelab/frontend/view/components'
import {
  IAnyType,
  IPrimitiveType,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import tw from 'twin.macro'
import { UiPropertiesFn } from '../types'

export const primativeTypeUiProperties: UiPropertiesFn<IPrimitiveType> = (
  type: IAnyType,
  context: any,
) => {
  // TODO: default is checkboxed, could have a dynamic input to apply data binding expression
  if (type.name === IPrimitiveTypeKind.Boolean) {
    return {}
  }

  return {
    uniforms: {
      component: CodeMirrorField({
        height: '100px',
        customOptions: stateOptions(context?.autocomplete),
      }),
    },
  }
}
