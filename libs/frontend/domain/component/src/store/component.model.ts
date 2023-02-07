import type {
  IComponent,
  IComponentDTO,
  IElement,
  IProp,
} from '@codelab/frontend/abstract/core'
import { COMPONENT_NODE_TYPE } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import {
  ElementTree,
  ElementTreeService,
} from '@codelab/frontend/domain/element'
import { Prop } from '@codelab/frontend/domain/prop'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  componentRef,
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  clone,
  ExtendedModel,
  idProp,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'

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
    instanceElement: null,
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
    // if this is a duplicate, trace source component id else null
    sourceComponentId: prop<Nullable<string>>(null).withSetter(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
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

  @computed
  get elementService() {
    return getElementService(this)
  }

  @modelAction
  private cloneTree(clonedComponentId: string, cloneIndex: number) {
    console.debug('ElementTreeService.cloneTree', this.elementTree.elementsList)

    const componentService = getComponentService(this)
    const elementMap: Map<string, string> = new Map()

    const elements = this.elementTree.elementsList
      .map((e) => {
        const clonedElement = clone<IElement>(e, { generateNewIds: true })
        clonedElement.setSlug(`${e.slug}.${cloneIndex}`)
        clonedElement.setSourceElementId(e.id)

        if (e.atom) {
          clonedElement.setAtom(atomRef(e.atom.id))
        }

        if (e.props) {
          clonedElement.setProps(e.props.clone())
        }

        if (e.renderComponentType?.current) {
          const clonedComponent = componentService.cloneComponentTree(
            clonedElement,
            e.renderComponentType.current,
          )

          clonedElement.setRenderComponentType(componentRef(clonedComponent.id))
        }

        // store elements in elementService
        this.elementService.clonedElements.set(clonedElement.id, clonedElement)

        // keep trace of copies to update parents
        elementMap.set(e.id, clonedElement.id)

        return clonedElement
      })
      .map((element) => {
        element.setParentId(
          (element.parentId && elementMap.get(element.parentId)) || null,
        )
        element.setNextSiblingId(
          (element.nextSiblingId && elementMap.get(element.nextSiblingId)) ||
            null,
        )
        element.setPrevSiblingId(
          (element.prevSiblingId && elementMap.get(element.prevSiblingId)) ||
            null,
        )
        element.setFirstChildId(
          (element.firstChildId && elementMap.get(element.firstChildId)) ||
            null,
        )

        return element
      })

    const rootElementId = this.elementTree.root?.id
      ? elementMap.get(this.elementTree.root.id)
      : null

    const rootElement = elements.find((e) => e.id === rootElementId)
    rootElement?.setParentComponent(componentRef(clonedComponentId))

    if (!rootElement) {
      throw new Error('rootElement not found')
    }

    return ElementTree.init(rootElement, elements)
  }

  /**
   * @param cloneIndex clones count for the same component (used for elements slugs)
   */
  @modelAction
  clone(cloneIndex: number) {
    const clonedComponent: IComponent = clone<IComponent>(this)

    if (this.props) {
      clonedComponent.props = this.props.clone()
    }

    clonedComponent.setSourceComponentId(this.id)

    clonedComponent.setElementTree(
      this.cloneTree(clonedComponent.id, cloneIndex),
    )

    return clonedComponent
  }
}
