import type {
  IAuth0Owner,
  IComponentDTO,
  IElement,
  IInterfaceType,
  IProp,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  IComponent,
  isComponentModel,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  ElementTree,
  ElementTreeService,
} from '@codelab/frontend/domain/element'
import { Prop } from '@codelab/frontend/domain/prop'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  componentRef,
  getComponentService,
} from '@codelab/frontend/presenter/container'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  clone,
  ExtendedModel,
  frozen,
  idProp,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'

const create = ({
  id,
  name,
  props,
  api,
  owner,
  rootElement,
  childrenContainerElement,
}: IComponentDTO) => {
  const apiRef = typeRef(api.id) as Ref<InterfaceType>

  return new Component({
    id,
    name,
    rootElement: elementRef(rootElement.id),
    owner,
    api: typeRef<IInterfaceType>(api.id),
    props: props
      ? Prop.create({
          id: props.id,
          api: apiRef,
          data: props.data,
        })
      : null,
    childrenContainerElement: elementRef(childrenContainerElement.id),
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
    rootElement: prop<Ref<IElement>>().withSetter(),
    owner: prop<IAuth0Owner>(),
    api: prop<Ref<IInterfaceType>>(),
    props: prop<Nullable<IProp>>(null).withSetter(),
    childrenContainerElement: prop<Ref<IElement>>().withSetter(),
    // if this is a duplicate, trace source component id else null
    sourceComponent: prop<Nullable<IEntity>>(null).withSetter(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static create = create

  @modelAction
  writeCache({
    id,
    name,
    props,
    api,
    owner,
    rootElement,
    childrenContainerElement,
  }: Partial<IComponentDTO>) {
    const apiRef = api?.id ? typeRef<IInterfaceType>(api.id) : this.api

    this.name = name ?? this.name
    this.rootElement = rootElement?.id
      ? elementRef(rootElement.id)
      : this.rootElement
    this.owner = owner ?? this.owner
    this.api = apiRef
    this.props = props
      ? Prop.create({
          id: props.id,
          api: apiRef,
          data: props.data,
        })
      : null

    this.childrenContainerElement = childrenContainerElement
      ? elementRef(childrenContainerElement.id)
      : this.childrenContainerElement

    return this
  }

  @modelAction
  private cloneTree(clonedComponent: IComponent, cloneIndex: number) {
    console.debug('ElementTreeService.cloneTree', this.elementTree.elements)

    const elementMap: Map<string, string> = new Map()

    const elements = this.elementTree.elements.map((element) => {
      const clonedElement = element.clone(cloneIndex)

      // don't move it to element model to avoid dependency issues
      if (isComponentModel(element.renderType)) {
        const componentClone = element.renderType.current.clone(
          clonedElement.id,
        )

        clonedElement.setRenderType(componentRef(componentClone.id))
      }

      if (element.id === clonedComponent.childrenContainerElement.id) {
        clonedComponent.setChildrenContainerElement(
          elementRef(clonedElement.id),
        )
      }

      // keep trace of copies to update parents
      elementMap.set(element.id, clonedElement.id)

      return clonedElement
    })

    const rootElementId = this.elementTree.root?.id
      ? elementMap.get(this.elementTree.root.id)
      : null

    const rootElement = elements.find((element) => element.id === rootElementId)
    rootElement?.setParentComponent(componentRef(clonedComponent.id))

    if (!rootElement) {
      throw new Error('rootElement not found')
    }

    return ElementTree.init(rootElement, elements)
  }

  /**
   * @param instanceId element which component clone will be attached to
   */
  @modelAction
  clone(instanceId: string) {
    const componentService = getComponentService(this)

    // if instance already created
    if (componentService.clonedComponents.has(instanceId)) {
      return throwIfUndefined(componentService.clonedComponents.get(instanceId))
    }

    const clonesList = [...componentService.clonedComponents.values()].filter(
      (component) => component.sourceComponent?.id === this.id,
    )

    const clonedComponent: IComponent = clone<IComponent>(this)
    const clonedTree = this.cloneTree(clonedComponent, clonesList.length)

    clonedComponent.setProps(this.props ? this.props.clone() : null)
    clonedComponent.setElementTree(clonedTree)
    clonedComponent.setSourceComponent({ id: this.id })
    clonedComponent.setInstanceElement(elementRef(instanceId))

    componentService.clonedComponents.set(instanceId, clonedComponent)

    return clonedComponent
  }
}
