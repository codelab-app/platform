import type {
  IActionModel,
  IApiActionModel,
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import type { IApiActionDto } from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import {
  actionRef,
  resourceRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend-domain-prop/store'
import { IActionKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

import { createBaseAction } from './base-action.model'

const create = ({
  config,
  errorAction,
  id,
  name,
  resource,
  store,
  successAction,
}: IApiActionDto) =>
  new ApiAction({
    config: Prop.create(config),
    errorAction: errorAction?.id ? actionRef(errorAction.id) : null,
    id,
    name,
    resource: resourceRef(resource.id),
    store: storeRef(store.id),
    successAction: successAction?.id ? actionRef(successAction.id) : null,
    type: IActionKind.ApiAction,
  })

@model('@codelab/ApiAction')
export class ApiAction
  extends ExtendedModel(createBaseAction(IActionKind.ApiAction), {
    config: prop<IPropModel>(),
    errorAction: prop<Nullish<Ref<IActionModel>>>(),
    resource: prop<Ref<IResourceModel>>(),
    source: prop<Nullable<Ref<IActionModel>>>(null),
    successAction: prop<Nullish<Ref<IActionModel>>>(),
  })
  implements IApiActionModel
{
  static create = create

  get toJson() {
    return {
      __typename: IActionKind.ApiAction as const,
      config: this.config.toJson,
      errorAction: this.errorAction?.current,
      id: this.id,
      name: this.name,
      resource: this.resource.current.toJson,
      store: this.store.current,
      successAction: this.successAction?.current,
      type: this.type,
    }
  }

  @modelAction
  writeCache({
    config,
    errorAction,
    name,
    resource,
    successAction,
  }: Partial<IApiActionDto>) {
    this.name = name ?? this.name
    this.resource = resource ? resourceRef(resource.id) : this.resource
    this.config = config ? Prop.create(config) : this.config
    this.errorAction = errorAction
      ? actionRef(errorAction.id)
      : this.errorAction
    this.successAction = successAction
      ? actionRef(successAction.id)
      : this.successAction

    return this
  }
}
