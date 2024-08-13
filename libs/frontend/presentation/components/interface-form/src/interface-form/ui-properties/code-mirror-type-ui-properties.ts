import type { ICodeMirrorTypeModel } from '@codelab/frontend/abstract/domain'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import { CodeMirrorField } from '@codelab/frontend-presentation-components-form'
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
