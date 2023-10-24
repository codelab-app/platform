import type {
  IActionModel,
  IApiActionModel,
  IPropModel,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import {
  actionRef,
  resourceRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { Prop } from '@codelab/frontend/domain/prop'
import type {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IApiActionDTO } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
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
}: IApiActionDTO) =>
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

  static toDeleteInput(): ApiActionDeleteInput {
    return {
      config: { where: {} },
    }
  }

  @modelAction
  writeCache({
    config,
    errorAction,
    name,
    resource,
    successAction,
  }: Partial<IApiActionDTO>) {
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

  @computed
  get toJson() {
    return {
      __typename: `${IActionKind.ApiAction}` as const,
      config: this.config.toJson,
      errorAction: this.errorAction?.current,
      id: this.id,
      name: this.name,
      resource: this.resource.current.toJson,
      store: this.store.current,
      successAction: this.successAction?.current,
    }
  }

  toCreateInput(): ApiActionCreateInput {
    return {
      config: {
        create: {
          node: this.config.toCreateInput(),
        },
      },
      // empty object errorAction: {} causes validation error
      errorAction: this.errorAction?.id
        ? {
            ApiAction: connectNodeId(this.errorAction.id),
            CodeAction: connectNodeId(this.errorAction.id),
          }
        : undefined,
      id: this.id,
      name: this.name,
      resource: connectNodeId(this.resource.id),
      store: connectNodeId(this.store.id),
      // empty object successAction: {} causes validation error
      successAction: this.successAction?.id
        ? {
            ApiAction: connectNodeId(this.successAction.id),
            CodeAction: connectNodeId(this.successAction.id),
          }
        : undefined,
    }
  }

  toUpdateInput(): ApiActionUpdateInput {
    return {
      config: {
        update: {
          node: this.config.toUpdateInput(),
        },
      },
      // empty object errorAction: {} causes validation error
      errorAction: this.errorAction?.id
        ? {
            ApiAction: connectNodeId(this.errorAction.id),
            CodeAction: connectNodeId(this.errorAction.id),
          }
        : undefined,
      name: this.name,
      resource: connectNodeId(this.resource.id),
      // empty object successAction: {} causes validation error
      successAction: this.successAction?.id
        ? {
            ApiAction: connectNodeId(this.successAction.id),
            CodeAction: connectNodeId(this.successAction.id),
          }
        : undefined,
    }
  }
}
