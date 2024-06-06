import type { ICodeMirrorTypeModel } from '@codelab/frontend/abstract/domain'
import type { UiPropertiesFn } from '../types'
import { CodeMirrorField } from '@codelab/frontend-presentation-view/components/form'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-view/components/codeMirror'

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
