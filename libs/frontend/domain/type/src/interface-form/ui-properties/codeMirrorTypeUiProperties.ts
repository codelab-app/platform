import type { ICodeMirrorType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
} from '@codelab/frontend/view/components'
import type { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<ICodeMirrorType> = (
  type,
  context,
) => {
  return {
    uniforms: {
      component: CodeMirrorField({
        customOptions: createAutoCompleteOptions(context?.autocomplete),
        language: type.language,
      }),
    },
  }
}
