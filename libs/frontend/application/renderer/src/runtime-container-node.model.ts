import type {
  IRuntimeComponentPropModel,
  IRuntimeContainerNodeDTO,
  IRuntimeStoreModel,
  SubTree,
} from '@codelab/frontend/abstract/application'
import {
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  runtimeContainerNodeRef,
  runtimeElementRef,
  runtimeStoreRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  elementRef,
  IElementModel,
  isComponent,
  isPage,
  pageRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import type { ReactElement } from 'react'
import { v4 } from 'uuid'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const create = (dto: IRuntimeContainerNodeDTO) =>
  new RuntimeContainerNodeModel(dto)

@model('@codelab/RuntimeContainerNode')
export class RuntimeContainerNodeModel
  extends Model({
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    componentRuntimeProp: prop<Maybe<IRuntimeComponentPropModel>>(),
    containerNode: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    runtimeContainerNodes: prop<ObjectMap<IRuntimeContainerNodeModel>>(() =>
      objectMap([]),
    ),
    runtimeElements: prop<ObjectMap<IRuntimeElementModel>>(() => objectMap([])),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
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

  @modelAction
  addContainerNode(
    node: IComponentModel | IPageModel,
    runtimeParent: IRef,
    subTrees: Array<SubTree> = [],
    childMapperIndex?: number,
  ): IRuntimeContainerNodeModel {
    const foundNode = this.runtimeContainerNodesList.find(
      (runtimeNode) =>
        runtimeNode.containerNode.id === node.id &&
        (!childMapperIndex ||
          runtimeNode.childMapperIndex === childMapperIndex),
    )

    if (foundNode) {
      return foundNode
    }

    const id = v4()

    const runtimeNode = RuntimeContainerNodeModel.create({
      childMapperIndex,
      componentRuntimeProp: isComponent(node)
        ? RuntimeComponentPropModel.create({
            runtimeComponent: runtimeContainerNodeRef(id),
          })
        : undefined,
      containerNode: isPage(node) ? pageRef(node.id) : componentRef(node.id),
      id,
      runtimeParent: runtimeElementRef(runtimeParent.id),
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

  @modelAction
  addElement(node: IElementModel): IRuntimeElementModel {
    const foundElement = this.runtimeElementsList.find(
      (runtimeNode) => runtimeNode.element.id === node.id,
    )

    if (foundElement) {
      return foundElement
    }

    const id = v4()

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: runtimeContainerNodeRef(this.id),
      element: elementRef(node.id),
      id,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    this.runtimeElements.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }

  @computed
  get runtimeRootElement() {
    return this.addElement(this.containerNode.current.rootElement.current)
  }

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }
}
