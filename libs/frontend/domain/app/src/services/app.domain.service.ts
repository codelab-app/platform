import type { IAppDto } from '@codelab/shared/abstract/core'

import {
  type IAppDomainService,
  type IAppModel,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { App } from '../store/app.model'

@model('@codelab/AppDomainService')
export class AppDomainService
  extends Model({
    apps: prop(() => objectMap<IAppModel>()),
  })
  implements IAppDomainService
{
  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @modelAction
  hydrate = ({ domains, id, name, owner, pages }: IAppDto) => {
    const app = App.create({
      domains,
      id,
      name,
      owner,
      pages,
    })

    this.apps.set(app.id, app)

    return app
  }
}
