import {
  getAtomDomainService,
  type IAppDomainService,
  type IAppModel,
} from '@codelab/frontend/abstract/domain'
import { PageFactory } from '@codelab/frontend/domain/page'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { App } from './store/app.model'

@model('@codelab/AppDomainService')
export class AppDomainService
  extends Model({
    apps: prop(() => objectMap<IAppModel>()),
    pageFactory: prop(() => new PageFactory({})),
  })
  implements IAppDomainService
{
  @computed
  get appsJson() {
    return this.appsList.map((app) => app.toJson).reduce(merge, {})
  }

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  @modelAction
  hydrate = ({ domains, id, name, owner, pages }: IAppDTO) => {
    let app = this.apps.get(id)

    if (app) {
      app.writeCache({
        domains,
        name,
        pages,
      })
    } else {
      app = App.create({
        domains,
        id,
        name,
        owner,
        pages,
      })
    }

    this.apps.set(app.id, app)

    return app
  }

  @modelAction
  create = (appDto: IAppDTO) => {
    const app = this.hydrate(appDto)
    const renderType = this.atomDomainService.defaultRenderType
    this.pageFactory.addSystemPages(app, renderType)

    return app
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }
}
