import type {
  IRuntimeContainerNodeDTO,
  IRuntimeContainerNodeModel,
  IRuntimeElementModel,
  IRuntimeModelRef,
  IRuntimePropModel,
  IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'

const create = ({
  containerNodeRef,
  id,
  parentRef,
  runtimeProps,
  runtimeRootElement,
  runtimeStore,
}: IRuntimeContainerNodeDTO) =>
  new RuntimeContainerNodeModel({
    containerNodeRef,
    id,
    parentRef,
    runtimeProps,
    runtimeRootElement,
    runtimeStore,
  })

@model('@codelab/RuntimeContainerNode')
export class RuntimeContainerNodeModel
  extends Model({
    containerNodeRef: prop<Ref<IComponentModel> | Ref<IPageModel>>(),
    id: idProp,
    parentRef: prop<Maybe<IRuntimeModelRef>>(),
    runtimeProps: prop<Maybe<IRuntimePropModel>>(undefined),
    runtimeRootElement: prop<IRuntimeElementModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeContainerNodeModel
{
  static create = create

  @computed
  get containerNode() {
    return this.containerNodeRef.current
  }

  @computed
  get parent() {
    return this.parentRef?.current
  }

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }
}
