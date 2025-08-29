import type {
  IAuthGuardDomainService,
  IAuthGuardModel,
} from '@codelab/frontend-abstract-domain'
import type { IAuthGuardDto } from '@codelab/shared-abstract-core'

import { SelectOption } from '@codelab/frontend-abstract-types'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { AuthGuardModel } from '../store'

@model('@codelab/AuthGuardDomainService')
export class AuthGuardDomainService
  extends Model({
    authGuards: prop(() => objectMap<IAuthGuardModel>()),
  })
  implements IAuthGuardDomainService
{
  @computed
  get authGuardList() {
    return [...this.authGuards.values()]
  }

  getSelectOptions(): Array<SelectOption> {
    return this.authGuardList.map((authGuard) => ({
      label: authGuard.name,
      value: authGuard.id,
    }))
  }

  @modelAction
  hydrate({
    config,
    id,
    name,
    owner,
    resource,
    responseTransformer,
  }: IAuthGuardDto) {
    let authGuard = this.authGuards.get(id)

    if (authGuard) {
      authGuard.writeCache({
        config,
        name,
        resource,
        responseTransformer,
      })
    } else {
      authGuard = AuthGuardModel.create({
        config,
        id,
        name,
        owner,
        resource,
        responseTransformer,
      })
    }

    this.authGuards.set(authGuard.id, authGuard)

    return authGuard
  }
}
