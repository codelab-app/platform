import type { IElementApplicationValidationService } from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { schemaTransformer } from '@codelab/frontend-application-type/interface-form'
import { createValidator } from '@codelab/frontend-presentation-view/components'
import { Model, model } from 'mobx-keystone'

@model('@codelab/ElementApplicationValidationService')
export class ElementApplicationValidationService
  extends Model({})
  implements IElementApplicationValidationService
{
  propsHaveErrors(element?: IElementModel) {
    if (!element) {
      return false
    }

    const { props, renderType } = element
    const schema = schemaTransformer.transform(renderType.current.api.current)
    const validate = createValidator(schema)
    const result = validate(props.values)

    return result ? result.details.length > 0 : false
  }
}
