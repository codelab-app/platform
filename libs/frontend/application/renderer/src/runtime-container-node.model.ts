import {
  type IRuntimeComponentPropModel,
  type IRuntimeContainerNodeDTO,
  type IRuntimeContainerNodeModel,
  type IRuntimeElementModel,
  type IRuntimeModelRef,
  type IRuntimeStoreModel,
  runtimeContainerNodeRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  type IComponentModel,
  type IPageModel,
  isComponent,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'
import { v4 } from 'uuid'
import { RuntimeComponentProps } from './runtime-component-prop.model'

const create = ({
  containerNode,
  id = v4(),
  parentRef,
  runtimeRootElement,
  runtimeStore,
}: IRuntimeContainerNodeDTO) => {
  return new RuntimeContainerNodeModel({
    containerNode,
    id,
    parentRef,
    runtimeProps: isComponent(containerNode)
      ? RuntimeComponentProps.create({
          component: componentRef(containerNode.id),
          runtimeContainerNode: runtimeContainerNodeRef(id),
        })
      : undefined,
    runtimeRootElement,
    runtimeStore,
  })
}

@model('@codelab/RuntimeContainerNode')
export class RuntimeContainerNodeModel
  extends Model({
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    containerNode: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    parentRef: prop<Maybe<IRuntimeModelRef>>(),
    runtimeProps: prop<Maybe<IRuntimeComponentPropModel>>(undefined),
    runtimeRootElement: prop<IRuntimeElementModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeContainerNodeModel
{
  static create = create

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }
}
