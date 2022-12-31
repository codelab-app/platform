import type { IComponent, IComponentDTO } from '@codelab/frontend/abstract/core'
import { COMPONENT_NODE_TYPE } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { typeRef } from '@codelab/frontend/domain/type'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, idProp, model, prop } from 'mobx-keystone'

const hydrate = (component: IComponentDTO) => {
  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner.id,
    api: typeRef(component.api.id) as Ref<InterfaceType>,
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    __nodeType: prop<COMPONENT_NODE_TYPE>(COMPONENT_NODE_TYPE),
    name: prop<string>().withSetter(),
    // this isn't a Ref, because it will cause a circular dep.
    rootElementId: prop<string>().withSetter(),
    ownerId: prop<string>(),
    api: prop<Ref<InterfaceType>>(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  writeCache(fragment: IComponentDTO) {
    this.setName(fragment.name)
    this.rootElementId = fragment.rootElement.id
    this.ownerId = fragment.owner.id
    this.api = typeRef(fragment.api.id) as Ref<InterfaceType>

    return this
  }
}
