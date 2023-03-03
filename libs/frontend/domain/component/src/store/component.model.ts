import type {
  IComponentDTO,
  IElement,
  IInterfaceType,
  IProp,
  IStore,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  elementRef,
  ElementTree,
  getComponentService,
  IComponent,
  isComponentInstance,
  storeRef,
} from '@codelab/frontend/abstract/core'
import { propRef } from '@codelab/frontend/domain/prop'
import { typeRef } from '@codelab/frontend/domain/type'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { clone, ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  api,
  childrenContainerElement,
  id,
  name,
  owner,
  props,
  rootElement,
  store,
}: IComponentDTO) => {
  return new Component({
    api: typeRef<IInterfaceType>(api.id),
    childrenContainerElement: elementRef(childrenContainerElement.id),
    id,
    instanceElement: null,
    name,
    owner,
    props: propRef(props.id),
    rootElement: elementRef(rootElement.id),
    store: storeRef(store.id),
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTree, {
    api: prop<Ref<IInterfaceType>>(),
    childrenContainerElement: prop<Ref<IElement>>().withSetter(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
    name: prop<string>().withSetter(),
    owner: prop<IAuth0Owner>(),
    props: prop<Ref<IProp>>().withSetter(),
    // if this is a duplicate, trace source component id else null
    sourceComponent: prop<Nullable<IEntity>>(null).withSetter(),
    store: prop<Ref<IStore>>(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static create = create

  @modelAction
  writeCache({
    api,
    childrenContainerElement,
    id,
    name,
    owner,
    props,
    rootElement,
  }: Partial<IComponentDTO>) {
    const apiRef = api?.id ? typeRef<IInterfaceType>(api.id) : this.api

    this.name = name ?? this.name
    this.rootElement = rootElement?.id
      ? elementRef(rootElement.id)
      : this.rootElement
    this.owner = owner ?? this.owner
    this.api = apiRef
    this.props = props?.id ? propRef(props.id) : this.props

    this.childrenContainerElement = childrenContainerElement
      ? elementRef(childrenContainerElement.id)
      : this.childrenContainerElement

    return this
  }

  @modelAction
  private cloneTree(clonedComponent: IComponent, cloneIndex: number) {
    console.debug('ElementTreeService.cloneTree', this.elements)

    const elementMap: Map<string, string> = new Map()

    const elements = this.elements.map((element) => {
      const clonedElement = element.clone(cloneIndex)

      // don't move it to element model to avoid dependency issues
      if (isComponentInstance(element.renderType)) {
        const componentClone = element.renderType.current.clone(
          clonedElement.id,
        )

        clonedElement.setRenderType(componentRef(componentClone.id))
      }

      if (element.id === this.childrenContainerElement.maybeCurrent?.id) {
        clonedComponent.setChildrenContainerElement(
          elementRef(clonedElement.id),
        )
      }

      // keep trace of copies to update parents
      elementMap.set(element.id, clonedElement.id)

      return clonedElement
    })

    const rootElementId = this.rootElement.id
      ? elementMap.get(this.rootElement.id)
      : null

    elements.forEach((element) => {
      const { firstChild, nextSibling, parent, prevSibling } = element

      if (parent) {
        const parentId = elementMap.get(parent.current.id)
        element.setParent(elementRef(parentId!))
      }

      if (firstChild) {
        const firstChildId = elementMap.get(firstChild.current.id)
        element.setParent(elementRef(firstChildId!))
      }

      if (nextSibling) {
        const nextSiblingId = elementMap.get(nextSibling.current.id)
        element.setParent(elementRef(nextSiblingId!))
      }

      if (prevSibling) {
        const prevSiblingId = elementMap.get(prevSibling.current.id)
        element.setPrevSibling(elementRef(prevSiblingId!))
      }
    })

    const rootElement = elements.find((element) => element.id === rootElementId)
    rootElement?.setParentComponent(componentRef(clonedComponent.id))

    if (!rootElement) {
      throw new Error('rootElement not found')
    }

    clonedComponent.setRootElement(elementRef(rootElement.id))
  }

  /**
   * @param instanceId element which component clone will be attached to
   */
  @modelAction
  clone(instanceId: string) {
    const componentService = getComponentService(this)

    // if instance already created
    if (componentService.clonedComponents.has(instanceId)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return componentService.clonedComponents.get(instanceId)!
    }

    const clonesList = [...componentService.clonedComponents.values()].filter(
      (component) => component.sourceComponent?.id === this.id,
    )

    const clonedComponent: IComponent = clone<IComponent>(this)
    this.cloneTree(clonedComponent, clonesList.length)

    clonedComponent.setProps(propRef(this.props.current.clone()))
    clonedComponent.setSourceComponent({ id: this.id })
    clonedComponent.setInstanceElement(elementRef(instanceId))

    componentService.clonedComponents.set(instanceId, clonedComponent)

    return clonedComponent
  }

  @modelAction
  toCreateInput(): ComponentCreateInput {
    return {
      api: { create: { node: this.api.current.toCreateInput() } },
      childrenContainerElement: connectNodeId(this.rootElement.id),
      id: this.id,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
      props: { create: { node: this.props.current.toCreateInput() } },
      rootElement: {
        create: { node: this.rootElement.current.toCreateInput() },
      },
      store: { create: { node: this.store.current.toCreateInput() } },
    }
  }

  /**
   * Finds all the components that are referenced by all the
   * children of this component as well as the children of
   * any of these found components recursively
   */
  @computed
  get descendantComponents() {
    const descendants = new Set<IComponent>()

    this.elements.forEach((element) => {
      if (isComponentInstance(element.renderType)) {
        const component = element.renderType.current

        // Add the component as it was referenced by this element
        descendants.add(component)

        // Now start at this component and get its descendants
        component.descendantComponents.forEach((descendantComponent) => {
          descendants.add(descendantComponent)
        })
      }
    })

    return Array.from(descendants)
  }
}
