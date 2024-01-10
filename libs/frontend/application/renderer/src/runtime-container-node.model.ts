import type {
  IRuntimeContainerNodeDTO,
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  IRuntimeStoreModel,
  SubTree,
} from '@codelab/frontend/abstract/application'
import {
  runtimeContainerNodeRef,
  runtimeElementRef,
  runtimeModelRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  elementRef,
  isComponent,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { idProp, Model, model, objectMap, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'
import { v4 } from 'uuid'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const create = (dto: IRuntimeContainerNodeDTO) =>
  new RuntimeContainerNodeModel(dto)

@model('@codelab/RuntimeContainerNode')
export class RuntimeContainerNodeModel
  extends Model({
    containerNode: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    runtimeContainerNodes: prop<ObjectMap<IRuntimeContainerNodeModel>>(() =>
      objectMap([]),
    ),
    runtimeElements: prop<ObjectMap<IRuntimeElementModel>>(() => objectMap([])),
    runtimeStore: prop<IRuntimeStoreModel>(),
    subTrees: prop<Array<SubTree>>(() => []),
  })
  implements IRuntimeContainerNodeModel
{
  static create = create

  @computed
  get runtimeContainerNodesList() {
    return [...this.runtimeContainerNodes.values()]
  }

  @computed
  get runtimeElementsList() {
    return [...this.runtimeElements.values()]
  }

  private transformContainerNode(
    node: IComponentModel | IPageModel,
    subTrees: Array<SubTree> = [],
  ): IRuntimeContainerNodeModel {
    const foundNode = this.runtimeContainerNodesList.find(
      (runtimeNode) => runtimeNode.containerNode.id === node.id,
    )

    if (foundNode) {
      return foundNode
    }

    const runtimeNode = RuntimeContainerNodeModel.create({
      containerNode: isPage(node) ? pageRef(node.id) : componentRef(node.id),
      runtimeStore: RuntimeStoreModel.create({
        runtimeProviderStore: isPage(node)
          ? runtimeStoreRef(this.runtimeStore.id)
          : undefined,
        store: storeRef(node.store.id),
      }),
      subTrees,
    })

    this.runtimeContainerNodes.set(runtimeNode.id, runtimeNode)

    return runtimeNode
  }

  private transformElement(
    node: IElementModel,
    subTrees: Array<SubTree> = [],
  ): IRuntimeElementModel {
    const renderType = node.renderType.current

    const shouldRenderComponent =
      renderType.__typename === IElementRenderTypeKind.Component

    const children: Array<IRuntimeContainerNodeModel | IRuntimeElementModel> =
      shouldRenderComponent
        ? [
            // put component as a child instead of instance element children
            this.transformContainerNode(
              renderType,
              // pass instance element children as subTrees to be transformed later
              node.children.map((child) => elementRef(child.id)),
            ),
          ]
        : node.children.map((child) => this.transformElement(child))

    const shouldAttachSubTrees = isPage(this.containerNode.current)
      ? this.containerNode.current.pageContentContainer?.id === node.id
      : this.containerNode.current.childrenContainerElement.id === node.id

    if (shouldAttachSubTrees) {
      const runtimeSubTrees = subTrees.map((child) =>
        isPage(child.current) || isComponent(child.current)
          ? this.transformContainerNode(child.current)
          : this.transformElement(child.current),
      )

      children.push(...runtimeSubTrees)
    }

    const foundElement = this.runtimeElementsList.find(
      (runtimeNode) => runtimeNode.element.id === node.id,
    )

    if (foundElement) {
      return foundElement
    }

    const id = v4()

    const runtimeElement = RuntimeElementModel.create({
      children: children.map((child) => runtimeModelRef(child)),
      closestContainerNode: runtimeContainerNodeRef(this.id),
      element: elementRef(node.id),
      id,
      runtimeProps: new RuntimeElementPropsModel({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    this.runtimeElements.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }

  @computed
  get runtimeRootElement() {
    return this.transformElement(
      this.containerNode.current.rootElement.current,
      this.subTrees,
    )
  }

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }
}
