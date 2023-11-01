import type {
  IPropPipe,
  IRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { DATA_ELEMENT_ID, isAtomRef } from '@codelab/frontend/abstract/domain'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'

@model('@codelab/ElementPropsPipe')
export class ElementPropsPipe extends Model({}) implements IPropPipe {
  merge(runtimeElement: IRuntimeElement) {
    const element = runtimeElement.elementRef.current
    const props = element.props.values
    const registerReference = isAtomRef(element.renderType)
    const store = element.store.current
    const slug = element.slug

    return {
      props: {
        ...props,
        [DATA_ELEMENT_ID]: element.id,
        key: element.id,
        ref: registerReference
          ? (node: HTMLElement) => store.registerRef(slug, node)
          : undefined,
      },
    }
  }
}
