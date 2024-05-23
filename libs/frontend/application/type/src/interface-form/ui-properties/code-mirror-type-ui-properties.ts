import type { ICodeMirrorTypeModel } from '@codelab/frontend/abstract/domain'
import {
  CodeMirrorField,
  createAutoCompleteOptions,
} from '@codelab/frontend-presentation-view/components'
import type { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<
  ICodeMirrorTypeModel
> = (type, context) => {
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
