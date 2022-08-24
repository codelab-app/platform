import { CodeMirrorField } from '@codelab/frontend/view/components'
import { ICodeMirrorType } from '@codelab/shared/abstract/core'
import { UiPropertiesFn } from '../types'

export const codeMirrorTypeUiProperties: UiPropertiesFn<ICodeMirrorType> = (
  type,
) => {
  return {
    uniforms: {
      component: CodeMirrorField(type.language),
    },
  }
}
