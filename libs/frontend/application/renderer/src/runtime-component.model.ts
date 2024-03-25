import type {
  IRuntimeComponentDTO,
  IRuntimeComponentModel,
  IRuntimeComponentPropModel,
  IRuntimeModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import {
  getRuntimeElementService,
  IRuntimeElementModel,
  runtimeComponentRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  IElementTreeViewDataNode,
  isComponent,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectKey } from '@codelab/shared/utils'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const compositeKey = (
  component: IComponentModel,
  parent: IRuntimeModel,
  propKey?: ObjectKey,
  childMapperIndex?: number,
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
  return `runtime.${parent.compositeKey}.${component.id}${instanceKeyToRoot}${propKey}${childMapperIndex}`
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
    children: prop<Array<Ref<IElementModel>>>(() => []),
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
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }

  @computed
  get runtimeElementService() {
    return getRuntimeElementService(this)
  }

  @computed
  get runtimeRootElement(): IRuntimeElementModel {
    const rootElement = this.component.current.rootElement.current

    return this.runtimeElementService.add(rootElement, this)
  }

  @computed
  get treeViewNode(): IElementTreeViewDataNode {
    return {
      ...this.runtimeRootElement.treeViewNode,
      ...(!isNil(this.childMapperIndex) ? { children: [] } : {}),
      isChildMapperComponentInstance: !isNil(this.childMapperIndex),
      key: `${this.runtimeRootElement.element.current.id}${
        !isNil(this.childMapperIndex) ? `-${this.childMapperIndex}` : ''
      }`,
      primaryTitle: `${this.runtimeRootElement.element.current.name}${
        !isNil(this.childMapperIndex) ? ` ${this.childMapperIndex}` : ''
      }`,
    }
  }
}
