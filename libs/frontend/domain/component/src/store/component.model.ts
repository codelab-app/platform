import {
  COMPONENT_NODE_TYPE,
  IComponent,
  IComponentDTO,
  IProp,
} from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import { Prop } from '@codelab/frontend/domain/prop'
import { InterfaceType, typeRef } from '@codelab/frontend/domain/type'
import { Nullable } from '@codelab/shared/abstract/types'
import { ExtendedModel, idProp, model, prop, Ref } from 'mobx-keystone'

const hydrate = (component: IComponentDTO) => {
  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner.id,
    api: typeRef(component.api.id) as Ref<InterfaceType>,
    props: component.props
      ? Prop.hydrate({
          ...component.props,
          apiRef: typeRef(component.api.id) as Ref<InterfaceType>,
        })
      : null,
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTreeService, {
    __nodeType: prop<COMPONENT_NODE_TYPE>(COMPONENT_NODE_TYPE),
    id: idProp,
    name: prop<string>().withSetter(),
    // this isn't a Ref, because it will cause a circular dep.
    rootElementId: prop<string>().withSetter(),
    ownerId: prop<string>(),
    api: prop<Ref<InterfaceType>>(),
    props: prop<Nullable<IProp>>(null),
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

    if (fragment.props) {
      this.props?.writeCache({ ...fragment.props, apiRef: this.api })
    } else {
      this.props = null
    }

    return this
  }
}
