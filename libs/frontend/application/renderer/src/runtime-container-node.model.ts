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
import isNil from 'lodash/isNil'
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
    isTypedProp: prop<Maybe<boolean>>(false),
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
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }

  @computed
  get runtimeContainerNodesList() {
    return [...this.runtimeContainerNodes.values()]
  }

  @computed
  get runtimeElementsList() {
    return [...this.runtimeElements.values()]
  }

  @computed
  get runtimeRootElement() {
    return this.addElement(this.containerNode.current.rootElement.current)
  }

  @modelAction
  addContainerNode(
    node: IComponentModel | IPageModel,
    runtimeParent: IRef,
    subTrees: Array<SubTree> = [],
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeContainerNodeModel {
    const foundNode = this.runtimeContainerNodesList.find(
      (runtimeNode) =>
        runtimeNode.containerNode.id === node.id && isNil(childMapperIndex),
    )

    if (foundNode) {
      foundNode.subTrees = subTrees

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
      isTypedProp,
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

  /**
   * Used for cleaning up old child mapper nodes when the new evaluated prop has changed
   * e.g. when child mapper element depends on a filtered data
   * @param validNodes new evaluated child mapper prop
   */
  @modelAction
  cleanupChildMapperNodes(validNodes: Array<IRuntimeContainerNodeModel>) {
    const nodes = [...this.runtimeContainerNodes.values()]

    nodes.forEach((node) => {
      if (
        !isNil(node.childMapperIndex) &&
        !validNodes.some(
          (validNode) => validNode.childMapperIndex === node.childMapperIndex,
        )
      ) {
        this.runtimeContainerNodes.delete(node.id)
      }
    })
  }
}
