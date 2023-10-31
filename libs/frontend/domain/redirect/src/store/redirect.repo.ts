import type { IRedirectModel } from '@codelab/frontend/abstract/domain'
import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/abstract/codegen'
import { Model, model } from 'mobx-keystone'
import { redirectApi } from './redirect.api'
import { IRedirectRepository } from '@codelab/frontend/abstract/application'

@model('@codelab/RedirectRepository')
export class RedirectRepository
  extends Model({})
  implements IRedirectRepository
{
  // clear apps cache when we add a new redirect
  // to make sure that the new redirect is included in the apps query
  // @clearCacheForKey('apps')
  async add(redirect: IRedirectModel) {
    const {
      createRedirects: { redirects },
    } = await redirectApi.CreateRedirects({ input: redirect.toCreateInput() })

    return redirects[0]!
  }

  async delete(redirects: Array<IRedirectModel>) {
    const {
      deleteRedirects: { nodesDeleted },
    } = await redirectApi.DeleteRedirects({
      where: { id_IN: redirects.map((redirect) => redirect.id) },
    })

    return nodesDeleted
  }

  async find(where?: RedirectWhere, options?: RedirectOptions) {
    return redirectApi.GetRedirects({ options, where })
  }

  async findOne(where: RedirectWhere) {
    return (await this.find(where)).items[0]
  }

  async update(redirect: IRedirectModel) {
    const {
      updateRedirects: { redirects },
    } = await redirectApi.UpdateRedirects({
      update: redirect.toUpdateInput(),
      where: { id: redirect.id },
    })

    return redirects[0]!
  }
}
