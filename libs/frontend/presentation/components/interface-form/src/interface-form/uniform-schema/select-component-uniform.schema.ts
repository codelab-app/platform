import type {
  IReactNodeTypeModel,
  IRenderPropTypeModel,
} from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'

const COMPONENT_TEMPLATE = `{{
  function render() {
    const { AntDesignTypographyText } = this.atoms

    return (
      <AntDesignTypographyText>Content</AntDesignTypographyText>
    )
  }.bind(this)
}}`

export const componentUniformSchema: ITypeModelUniformSchemaBuilder<
  IReactNodeTypeModel | IRenderPropTypeModel
> = (type, autocomplete) => ({
  uniforms: {
    component: ExpressionSelectField,
    defaultExpression: COMPONENT_TEMPLATE,
  },
})
