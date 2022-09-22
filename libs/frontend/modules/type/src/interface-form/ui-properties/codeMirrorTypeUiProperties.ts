import {
  CodeMirrorField,
  stateOptions,
} from '@codelab/frontend/view/components'
import { ICodeMirrorType } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<ICodeMirrorType> = (
  type,
  context,
) => {
  return {
    uniforms: {
      component: CodeMirrorField({
        language: type.language,
        customOptions: stateOptions(context?.autocomplete),
      }),
    },
  }
}
