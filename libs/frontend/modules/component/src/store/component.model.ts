import { ElementTreeService } from '@codelab/frontend/modules/element'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import {
  COMPONENT_NODE_TYPE,
  IComponent,
  IComponentDTO,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, idProp, model, prop, Ref } from 'mobx-keystone'

const hydrate = (component: IComponentDTO) => {
  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner?.id,
    api: typeRef(component.api.id) as Ref<InterfaceType>,
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTreeService, {
    __nodeType: prop<COMPONENT_NODE_TYPE>(COMPONENT_NODE_TYPE),
    id: idProp,
    name: prop<string>(),
    // this isn't a Ref, because it will cause a circular dep.
    rootElementId: prop<string>().withSetter(),
    ownerId: prop<string>(),
    api: prop<Ref<InterfaceType>>(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  updateCache(fragment: IComponentDTO): void {
    this.name = fragment.name
    this.rootElementId = fragment.rootElement.id
    this.ownerId = fragment.owner?.id
    this.api = typeRef(fragment.api.id) as Ref<InterfaceType>
  }
}
