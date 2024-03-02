import {
  getRuntimeElementService,
  type IRuntimeComponentDTO,
  type IRuntimeComponentModel,
  type IRuntimeComponentPropModel,
  type IRuntimeElementModel,
  type IRuntimeStoreModel,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'
import type { ReactElement } from 'react'

const create = (dto: IRuntimeComponentDTO) => new RuntimeComponentModel(dto)

@model('@codelab/RuntimeComponent')
export class RuntimeComponentModel
  extends Model({
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    children: prop<Array<Ref<IElementModel>>>(() => []),
    component: prop<Ref<IComponentModel>>(),
    id: idProp,
    isTypedProp: prop<Maybe<boolean>>(false),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
    runtimeProps: prop<IRuntimeComponentPropModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeComponentModel
{
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
  get runtimeRootElement() {
    const rootElement = this.component.current.rootElement.current

    return this.runtimeElementService.add(rootElement)
  }
}
