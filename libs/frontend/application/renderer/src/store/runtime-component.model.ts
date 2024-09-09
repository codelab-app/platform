import type {
  IRuntimeComponentDTO,
  IRuntimeComponentModel,
  IRuntimeComponentPropModel,
  IRuntimeModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRuntimeComponentService,
  getRuntimeElementService,
  IElementTreeViewDataNode,
  IRuntimeElementModel,
  IRuntimeNodeType,
  runtimeComponentRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  isComponent,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'
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

const create = (dto: IRuntimeComponentDTO) =>
  new RuntimeComponentModel({
    ...dto,
    component: componentRef(dto.component),
    runtimeProps: RuntimeComponentPropModel.create({
      runtimeComponent: runtimeComponentRef(dto.compositeKey),
    }),
    runtimeStore: RuntimeStoreModel.create({
      store: storeRef(dto.component.store.current),
    }),
  })

@model('@codelab/RuntimeComponent')
export class RuntimeComponentModel
  extends Model({
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    component: prop<Ref<IComponentModel>>(),
    compositeKey: idProp,
    isTypedProp: prop<Maybe<boolean>>(false),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
    runtimeProps: prop<IRuntimeComponentPropModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeComponentModel
{
  static compositeKey = compositeKey

  static create = create

  @computed
  get children() {
    if (!this.runtimeParent || this.isChildMapperComponentInstance) {
      return []
    }

    const instanceElement = this.runtimeParent.current
    /**
     * These render only linked elements, not child mappers which are virtually linked via props
     */
    const instanceElementChildren = instanceElement.element.current.children

    return instanceElementChildren.map((child) =>
      this.runtimeElementService.add(
        child,
        instanceElement.closestContainerNode.current,
        instanceElement,
        instanceElement.propKey,
      ),
    )
  }

  @computed
  get isChildMapperComponentInstance() {
    return isNonNullish(this.childMapperIndex)
  }

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
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
  get runtimeRootElement(): IRuntimeElementModel {
    const rootElement = this.component.current.rootElement.current

    return this.runtimeElementService.add(rootElement, this, null)
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return {
      // hide children for child mapper instances
      children: this.isChildMapperComponentInstance
        ? []
        : [this.runtimeRootElement.treeViewNode],
      component: { id: this.component.current.id },
      isChildMapperComponentInstance: this.isChildMapperComponentInstance,
      key: this.compositeKey,
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

  @modelAction
  detach(): void {
    this.children.forEach((child) => {
      child.detach()
    })
    this.runtimeRootElement.detach()
    this.runtimeComponentService.delete(this)
  }
}
