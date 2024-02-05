import type { IAuthGuardRepository } from '@codelab/frontend/abstract/application'
import { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { cachedWithTTL, clearCacheForKey } from '@codelab/frontend/shared/utils'
import type { AuthGuardUniqueWhere } from '@codelab/shared/abstract/codegen'
import {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { authGuardApi } from './auth-guard.api'

@model('@codelab/AuthGuardRepository')
export class AuthGuardRepository
  extends Model({})
  implements IAuthGuardRepository
{
  @clearCacheForKey('authGuards')
  async add(authGuard: IAuthGuardModel) {
    const {
      createAuthGuards: { authGuards },
    } = await authGuardApi.CreateAuthGuards({
      input: [authGuard.toCreateInput()],
    })

    return authGuards[0]!
  }

  @clearCacheForKey('authGuards')
  async delete(authGuards: Array<IAuthGuardModel>) {
    const {
      deleteAuthGuards: { nodesDeleted },
    } = await authGuardApi.DeleteAuthGuards({
      delete: { config: { where: {} } },
      where: { id_IN: authGuards.map((authGuard) => authGuard.id) },
    })

    return nodesDeleted
  }

  @cachedWithTTL('authGuards')
  async find(where?: AuthGuardWhere, options?: AuthGuardOptions) {
    return await authGuardApi.GetAuthGuards({ options, where })
  }

  async findOne(where: AuthGuardUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  // @clearCacheForKey('authGuards')
  async update(authGuard: IAuthGuardModel) {
    const {
      updateAuthGuards: { authGuards },
    } = await authGuardApi.UpdateAuthGuard({
      update: authGuard.toUpdateInput(),
      where: { id: authGuard.id },
    })

    return authGuards[0]!
  }
}
