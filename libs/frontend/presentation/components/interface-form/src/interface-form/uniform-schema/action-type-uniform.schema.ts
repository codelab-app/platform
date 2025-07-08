import type { IActionTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'

const ACTION_TEMPLATE = `{{
  function(event) {
    // To access component props use component.[prop-name]
    /* your code here */
  }
}}`

export const actionTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IActionTypeModel
> = (type, autocomplete) => ({
  uniforms: {
    component: ExpressionSelectField,
    defaultExpression: ACTION_TEMPLATE,
  },
})
