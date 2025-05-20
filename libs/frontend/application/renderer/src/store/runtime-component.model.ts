import type {
  IElementTreeViewDataNode,
  IElementTreeViewDataNodePreview,
  IRuntimeComponentDto,
  IRuntimeComponentModel,
  IRuntimeComponentPropModel,
  IRuntimeElementModel,
  IRuntimeModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'

import {
  getRuntimeComponentService,
  getRuntimeElementService,
  IRuntimeNodeType,
  runtimeComponentRef,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  isComponent,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { isNonNullish } from 'remeda'

import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const compositeKey = (
  component: IComponentModel,
  parent?: IRuntimeModel,
  propKey = '',
  childMapperIndex = '',
) => {
  /**
   * sub trees of components may repeat which but they will never have the same root (instanceElement)
   * therefor use it to create a unique key
   */

  let instanceKeyToRoot = ''
  let parentNode: IComponentModel | IPageModel = component

  while (isComponent(parentNode) && parentNode.instanceElement?.id) {
    instanceKeyToRoot += parentNode.instanceElement.id
    parentNode = parentNode.instanceElement.current.closestContainerNode
  }

  // leave childMapperIndex the last to use keyStart for comparison
  return `${parent?.compositeKey || ''}.${
    component.id
  }${instanceKeyToRoot}${propKey}${childMapperIndex}`
}

const create = (dto: IRuntimeComponentDto) =>
  new RuntimeComponentModel({
    ...dto,
    component: componentRef(dto.component),
    runtimeProps: RuntimeComponentPropModel.create({
      runtimeComponent: runtimeComponentRef(dto.compositeKey),
    }),
    runtimeRootElement: runtimeElementRef(dto.runtimeRootElement),
    runtimeStore: RuntimeStoreModel.create({
      store: storeRef(dto.component.store.current),
    }),
  })

@model('@codelab/RuntimeComponent')
export class RuntimeComponentModel
  extends Model({
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    children: prop<Array<Ref<IRuntimeElementModel>>>(() => []).withSetter(),
    component: prop<Ref<IComponentModel>>(),
    compositeKey: idProp,
    isTypedProp: prop<Maybe<boolean>>(false),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
    runtimeProps: prop<IRuntimeComponentPropModel>(),
    runtimeRootElement: prop<Ref<IRuntimeElementModel>>().withSetter(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeComponentModel
{
  static compositeKey = compositeKey

  static create = create

  @computed
  get elements(): Array<IRuntimeElementModel> {
    return this.runtimeElementService.elementsList.filter(
      (element) =>
        element.closestContainerNode.compositeKey === this.compositeKey,
    )
  }

  @computed
  get isChildMapperComponentInstance() {
    return isNonNullish(this.childMapperIndex)
  }

  @computed
  get mainTreeElement(): Maybe<IRuntimeElementModel> {
    return this.runtimeParent?.current.mainTreeElement
  }

  @computed
  get rendered(): Nullable<ReactElement<unknown>> {
    return this.runtimeRootElement.current.rendered ?? null
  }

  @computed
  get runtimeComponentService() {
    return getRuntimeComponentService(this)
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get toJson(): IRuntimeComponentDto {
    return {
      childMapperIndex: this.childMapperIndex ?? undefined,
      component: this.component.current,
      compositeKey: this.compositeKey,
      isTypedProp: this.isTypedProp ?? undefined,
      runtimeParent: this.runtimeParent,
      runtimeRootElement: this.runtimeRootElement.current,
    }
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return {
      ...this.treeViewNodePreview,
      // hide children for child mapper instances
      children: this.isChildMapperComponentInstance
        ? []
        : [this.runtimeRootElement.current.treeViewNode],
      component: { id: this.component.current.id },
      isChildMapperComponentInstance: this.isChildMapperComponentInstance,
      primaryTitle: this.isChildMapperComponentInstance
        ? `${this.component.current.name} ${this.childMapperIndex}`
        : this.component.current.name,
      rootKey: this.component.current.id,
      secondaryTitle: this.isChildMapperComponentInstance
        ? 'Child Mapper Instance'
        : '',
      selectable: !this.isChildMapperComponentInstance,
      type: IRuntimeNodeType.Component,
    }
  }

  @computed
  get treeViewNodePreview(): IElementTreeViewDataNodePreview {
    return {
      key: this.compositeKey,
    }
  }

  @modelAction
  createChildren() {
    if (!this.runtimeParent || this.isChildMapperComponentInstance) {
      return []
    }

    const instanceElement = this.runtimeParent.current
    /**
     * These render only linked elements, not child mappers which are virtually linked via props
     */
    const instanceElementChildren = instanceElement.element.current.children

    const elements = instanceElementChildren.map((child) => {
      const element = this.runtimeElementService.add(
        child,
        instanceElement.compositeKey,
        instanceElement.propKey,
      )

      return runtimeElementRef(element)
    })

    return this.setChildren(elements)
  }

  @modelAction
  detach(): void {
    this.children.forEach((child) => {
      child.current.detach()
    })
    this.runtimeRootElement.current.detach()
    this.runtimeComponentService.remove(this)
  }

  @modelAction
  render() {
    this.runtimeProps.renderTypedProps()
    this.createChildren()
    this.children.map((child) => child.current.render())
    this.runtimeRootElement.current.render()
  }
}
