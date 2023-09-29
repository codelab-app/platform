import type {
  IComponentRuntimeProp,
  IElementModel,
  IInterfaceType,
  IPropModel,
  IStoreModel,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  DATA_COMPONENT_ID,
  elementRef,
  ElementTree,
  getComponentService,
  getRenderService,
  getUserService,
  IComponentModel,
  isComponentInstance,
  propRef,
  storeRef,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import {
  type IComponentDTO,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import type { IEntity, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { Maybe } from '@codelab/shared/abstract/types'
import { connectNodeId, connectOwner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { clone, ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  api,
  childrenContainerElement,
  id,
  keyGenerator,
  name,
  props,
  rootElement,
  store,
}: IComponentDTO) => {
  return new Component({
    api: typeRef<IInterfaceType>(api.id),
    childrenContainerElement: elementRef(childrenContainerElement.id),
    id,
    instanceElement: null,
    keyGenerator,
    name,
    props: propRef(props.id),
    rootElement: elementRef(rootElement.id),
    store: storeRef(store.id),
  })
}

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTree, {
    api: prop<Ref<IInterfaceType>>(),
    childrenContainerElement: prop<Ref<IElementModel>>().withSetter(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElementModel>>>(null).withSetter(),
    // a function to extract component key from input
    keyGenerator: prop<Nullish<string>>().withSetter(),
    name: prop<string>().withSetter(),
    props: prop<Ref<IPropModel>>().withSetter(),
    // if this is a duplicate, trace source component id else null
    sourceComponent: prop<Nullable<IEntity>>(null).withSetter(),
    store: prop<Ref<IStoreModel>>().withSetter(),
  })
  implements IComponentModel
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static create = create

  @computed
  get __typename() {
    return IElementRenderTypeKind.Component as const
  }

  /**
   * Finds all the components that are referenced by all the
   * children of this component as well as the children of
   * any of these found components recursively
   */
  @computed
  get descendantComponents() {
    const descendants = new Set<IComponentModel>()

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

  @computed
  get runtimeProp(): Maybe<IComponentRuntimeProp> {
    return this.renderService.activeRenderer?.current.runtimeProps.get(
      this.id,
    ) as Maybe<IComponentRuntimeProp>
  }

  @computed
  get toJson() {
    return {
      __typename: this.__typename,
      api: this.api,
      childrenContainerElement: this.childrenContainerElement,
      id: this.id,
      keyGenerator: this.keyGenerator,
      name: this.name,
      props: this.props,
      rootElement: this.rootElement,
      store: this.store,
    }
  }

  /**
   * @param key a unique identifier to avoid repeating clone
   * @param instanceId instance element id
   * Typed values doesn't have an instance element
   * therefore the key can't be the same as instanceId
   */
  @modelAction
  clone(key: string, instanceId?: string) {
    const componentService = getComponentService(this)

    // if instance already created
    if (componentService.clonedComponents.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return componentService.clonedComponents.get(key)!
    }

    const clonedComponent: IComponentModel = clone<IComponentModel>(this)
    componentService.clonedComponents.set(key, clonedComponent)

    const clonesList = [...componentService.clonedComponents.values()].filter(
      (component) => component.sourceComponent?.id === this.id,
    )

    this.cloneTree(clonedComponent, clonesList.length)

    const clonedStore = this.store.current.clone(clonedComponent.id)

    clonedComponent.setProps(propRef(this.props.current.clone()))
    clonedComponent.setSourceComponent({ id: this.id })
    clonedComponent.setStore(storeRef(clonedStore))

    clonedComponent.elements.forEach((childElement) => {
      childElement.props.current.set(DATA_COMPONENT_ID, clonedComponent.id)
    })

    if (instanceId) {
      clonedComponent.setInstanceElement(elementRef(instanceId))
    }

    return clonedComponent
  }

  @modelAction
  toCreateInput(): ComponentCreateInput {
    return {
      api: { create: { node: this.api.current.toCreateInput() } },
      childrenContainerElement: connectNodeId(this.rootElement.id),
      id: this.id,
      keyGenerator: this.keyGenerator,
      name: this.name,
      owner: connectOwner(this.userService.user),
      props: { create: { node: this.props.current.toCreateInput() } },
      rootElement: connectNodeId(this.rootElement.id),
      store: { create: { node: this.store.current.toCreateInput() } },
    }
  }

  @modelAction
  writeCache({
    api,
    childrenContainerElement,
    keyGenerator,
    name,
    props,
    rootElement,
  }: Partial<IComponentDTO>) {
    const apiRef = api?.id ? typeRef<IInterfaceType>(api.id) : this.api

    this.name = name ?? this.name
    this.rootElement = rootElement?.id
      ? elementRef(rootElement.id)
      : this.rootElement
    this.api = apiRef
    this.props = props?.id ? propRef(props.id) : this.props
    this.keyGenerator = keyGenerator ?? this.keyGenerator
    this.childrenContainerElement = childrenContainerElement
      ? elementRef(childrenContainerElement.id)
      : this.childrenContainerElement

    return this
  }

  @modelAction
  private cloneTree(clonedComponent: IComponentModel, cloneIndex: number) {
    console.debug('ElementTreeService.cloneTree', this.elements)

    const elementMap: Map<string, string> = new Map()

    const elements = this.elements.map((element) => {
      const clonedElement = element.clone(cloneIndex)

      // don't move it to element model to avoid dependency issues
      if (isComponentInstance(element.renderType)) {
        const componentClone = element.renderType.current.clone(
          clonedElement.id,
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
      const { firstChild, nextSibling, parentElement, prevSibling } = element

      if (parentElement) {
        const parentId = elementMap.get(parentElement.current.id)
        element.setParentElement(elementRef(parentId!))
      }

      if (firstChild) {
        const firstChildId = elementMap.get(firstChild.current.id)
        element.setFirstChild(elementRef(firstChildId!))
      }

      if (nextSibling) {
        const nextSiblingId = elementMap.get(nextSibling.current.id)
        element.setNextSibling(elementRef(nextSiblingId!))
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
   * Finds all the components that are referenced by all the
   * children of this component as well as the children of
   * any of these found components recursively
   */
  @computed
  private get renderService() {
    return getRenderService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
