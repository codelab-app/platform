import type {
  IAction,
  IApiAction,
  IProp,
  IResourceModel,
} from '@codelab/frontend/abstract/core'
import {
  actionRef,
  propRef,
  resourceRef,
  storeRef,
} from '@codelab/frontend/abstract/core'
import {
  ApiActionCreateInput,
  ApiActionDeleteInput,
  ApiActionUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IApiActionDTO } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
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
    config: propRef(config.id),
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
    config: prop<Ref<IProp>>(),
    errorAction: prop<Nullish<Ref<IAction>>>(),
    resource: prop<Ref<IResourceModel>>(),
    source: prop<Nullable<Ref<IAction>>>(null),
    successAction: prop<Nullish<Ref<IAction>>>(),
  })
  implements IApiAction
{
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
    this.config = config ? propRef<IProp>(config.id) : this.config
    this.errorAction = errorAction
      ? actionRef(errorAction.id)
      : this.errorAction
    this.successAction = successAction
      ? actionRef(successAction.id)
      : this.successAction

    return this
  }

  @modelAction
  toCreateInput(): ApiActionCreateInput {
    return {
      config: {
        create: {
          node: this.config.current.toCreateInput(),
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

  @modelAction
  toUpdateInput(): ApiActionUpdateInput {
    return {
      config: {
        update: {
          node: this.config.current.toUpdateInput(),
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

  @modelAction
  toDeleteInput(): ApiActionDeleteInput {
    return {
      config: { where: {} },
    }
  }

  static create = create
}
