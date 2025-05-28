import type { ICodeMirrorTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { CodeMirrorField } from '@codelab/frontend-presentation-components-form'

export const codeMirrorTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  ICodeMirrorTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: CodeMirrorField({} as TextFieldProps),
    },
  }
}
