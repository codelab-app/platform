import type {
  IPropPipe,
  IRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { getDefaultFieldProps } from '@codelab/frontend/domain/prop'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'

/**
 * This takes the default field value on the api and provide data as props
 */
@model('@codelab/DefaultFieldPropsPipe')
export class DefaultFieldPropsPipe
  extends Model({
    next: prop<IPropPipe>(),
  })
  implements IPropPipe
{
  merge(runtimeElement: IRuntimeElement) {
    const element = runtimeElement.elementRef.current
    const props = getDefaultFieldProps(element.renderType.current) ?? {}

    return {
      props,
    }
  }
}
