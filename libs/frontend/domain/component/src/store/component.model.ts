import type {
  IComponent,
  IComponentDTO,
  IProp,
} from '@codelab/frontend/abstract/core'
import { COMPONENT_NODE_TYPE } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import { Prop } from '@codelab/frontend/domain/prop'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { typeRef } from '@codelab/frontend/domain/type'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, idProp, model, prop } from 'mobx-keystone'

const hydrate = (component: IComponentDTO) => {
  const apiRef = typeRef(component.api.id) as Ref<InterfaceType>

  return new Component({
    id: component.id,
    name: component.name,
    rootElementId: component.rootElement.id,
    ownerId: component.owner.id,
    api: typeRef(component.api.id) as Ref<InterfaceType>,
    props: component.props
      ? Prop.hydrate({ ...component.props, apiRef })
      : null,
    childrenContainerElementId: component.childrenContainerElement.id,
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
    childrenContainerElementId: prop<string>(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  writeCache(fragment: IComponentDTO) {
    const apiRef = typeRef(fragment.api.id) as Ref<InterfaceType>

    this.setName(fragment.name)
    this.rootElementId = fragment.rootElement.id
    this.ownerId = fragment.owner.id
    this.api = typeRef(fragment.api.id) as Ref<InterfaceType>
    this.props = fragment.props
      ? new Prop({ id: fragment.props.id, apiRef })
      : null

    if (fragment.props) {
      this.props?.writeCache({ ...fragment.props, apiRef })
    }

    this.childrenContainerElementId = fragment.childrenContainerElement.id

    return this
  }
}
