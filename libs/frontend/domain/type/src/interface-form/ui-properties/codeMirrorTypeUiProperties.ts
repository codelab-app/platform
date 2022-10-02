import { ICodeMirrorType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
} from '@codelab/frontend/view/components'
import { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<ICodeMirrorType> = (
  type,
  context,
) => {
  return {
    uniforms: {
      component: CodeMirrorField({
        language: type.language,
        customOptions: createAutoCompleteOptions(context?.autocomplete),
      }),
    },
  }
}
