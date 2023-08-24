import type { ICodeMirrorType } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
} from '@codelab/frontend/presentation/view'
import type { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<ICodeMirrorType> = (
  type,
  context,
) => {
  return {
    uniforms: {
      component: CodeMirrorField({
        customOptions: context?.autocomplete
          ? createAutoCompleteOptions(context.autocomplete)
          : undefined,
        language: type.language,
      }),
    },
  }
}
