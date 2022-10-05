import {
  COMPONENT_NODE_TYPE,
  IComponent,
  IComponentDTO,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import {
  ElementTreeService,
  getElementService,
} from '@codelab/frontend/domain/element'
import { InterfaceType, typeRef } from '@codelab/frontend/domain/type'
import { RenderedComponentFragment } from '@codelab/shared/abstract/codegen'
import {
  detach,
  ExtendedModel,
  idProp,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

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
    __nodeType: prop<COMPONENT_NODE_TYPE>(COMPONENT_NODE_TYPE),
    id: idProp,
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

  @modelAction
  @modelAction
  loadComponentTree(renderedComponentFragment: RenderedComponentFragment) {
    const elementService = getElementService(this)
    const atomService = getAtomService(this)

    const elements = [
      renderedComponentFragment.rootElement,
      ...renderedComponentFragment.rootElement.descendantElements,
    ]

    atomService.writeCacheFromElements(elements)

    const hydratedElements = elements.map((element) =>
      elementService.writeCache(element),
    )

    const rootElement = elementService.element(
      renderedComponentFragment.rootElement.id,
    )

    if (!rootElement) {
      throw new Error('No root element found')
    }

    this.initTree(rootElement, hydratedElements)
  }
}

export const componentRef = rootRef<IComponent>('@codelab/ComponentRef', {
  onResolvedValueChange(ref, newComponent, oldComponent) {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})
