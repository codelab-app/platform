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
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  clone,
  ExtendedModel,
  idProp,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'

// const hydrate = (component: IComponentDTO) => {
//   const apiRef = typeRef(component.api.id) as Ref<InterfaceType>

//   return new Component({
//     id: component.id,
//     name: component.name,
//     rootElementId: component.rootElement.id,
//     owner: component.owner,
//     api: typeRef(component.api.id) as Ref<InterfaceType>,
//     props: component.props
//       ? Prop.hydrate({ ...component.props, apiRef })
//       : null,
//     childrenContainerElementId: component.childrenContainerElement.id,
//     instanceElement: null,
//   })
// }

@model('@codelab/Component')
export class Component
  extends ExtendedModel(ElementTreeService, {
    __nodeType: prop<COMPONENT_NODE_TYPE>(COMPONENT_NODE_TYPE),
    id: idProp,
    name: prop<string>().withSetter(),
    // this isn't a Ref, because it will cause a circular dep.
    rootElementId: prop<string>().withSetter(),
    owner: prop<IAuth0Owner>(),
    api: prop<Ref<IInterfaceType>>(),
    props: prop<Nullable<IProp>>(null).withSetter(),
    childrenContainerElementId: prop<string>().withSetter(),
    // if this is a duplicate, trace source component id else null
    sourceComponentId: prop<Nullable<string>>(null).withSetter(),
    // element which this component is attached to.
    instanceElement: prop<Nullable<Ref<IElement>>>(null).withSetter(),
  })
  implements IComponent
{
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  // static hydrate = hydrate

  // add(fragment: IComponentDTO) {
  //   const api = typeRef(fragment.api.id) as Ref<InterfaceType>

  //   this.setName(fragment.name)
  //   this.rootElementId = fragment.rootElement.id
  //   this.owner = fragment.owner
  //   this.api = typeRef(fragment.api.id) as Ref<InterfaceType>
  //   this.props = fragment.props
  //     ? new Prop({ id: fragment.props.id, api })
  //     : null

  //   if (fragment.props) {
  //     this.props?.add({ ...fragment.props, api })
  //   }

  //   this.childrenContainerElementId = fragment.childrenContainerElement.id

  //   return this
  // }

  @modelAction
  private cloneTree(clonedComponent: IComponent, cloneIndex: number) {
    console.debug('ElementTreeService.cloneTree', this.elementTree.elementsList)

    const elementMap: Map<string, string> = new Map()

    const elements = this.elementTree.elementsList
      .map((element) => {
        const clonedElement = element.clone(cloneIndex)

        // don't move it to element model to avoid dependency issues
        if (element.renderComponentType?.current) {
          const componentClone = element.renderComponentType.current.clone(
            clonedElement.id,
          )

          clonedElement.setRenderComponentType(componentRef(componentClone.id))
        }

        if (element.id === clonedComponent.childrenContainerElementId) {
          clonedComponent.setChildrenContainerElementId(clonedElement.id)
        }

        // keep trace of copies to update parents
        elementMap.set(element.id, clonedElement.id)

        return clonedElement
      })
      // first .map must complete before updating ids (elementMap)
      .map((element) => element.updateCloneIds(elementMap))

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
      (component) => component.sourceComponentId === this.id,
    )

    const clonedComponent: IComponent = clone<IComponent>(this)
    const clonedTree = this.cloneTree(clonedComponent, clonesList.length)

    clonedComponent.setProps(this.props ? this.props.clone() : null)
    clonedComponent.setElementTree(clonedTree)
    clonedComponent.setSourceComponentId(this.id)
    clonedComponent.setInstanceElement(elementRef(instanceId))

    componentService.clonedComponents.set(instanceId, clonedComponent)

    return clonedComponent
  }
}
