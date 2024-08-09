import {
  getAtomDomainService,
  getElementDomainService,
  getPageDomainService,
  getStoreDomainService,
  getTypeDomainService,
  getUserDomainService,
  type IAppDomainService,
  type IAppModel,
} from '@codelab/frontend/abstract/domain'
import { pageDomainFactory } from '@codelab/frontend-domain-page/services'
import type { IAppDto } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
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
  get appsJson() {
    return this.appsList.map((app) => app.toJson).reduce(merge, {})
  }

  @computed
  get appsList() {
    return [...this.apps.values()]
  }

  @modelAction
  create = (appDto: IAppDto) => {
    const app = this.hydrate(appDto)
    const renderType = this.atomDomainService.defaultRenderType

    const pages = pageDomainFactory({
      elementDomainService: this.elementDomainService,
      pageDomainService: this.pageDomainService,
      storeDomainService: this.storeDomainService,
      typeDomainService: this.typeDomainService,
      userDomainService: this.userDomainService,
    }).addSystemPages(app, renderType)

    return app.writeCache({ pages })
  }

  @modelAction
  hydrate = ({ domains, id, name, owner }: IAppDto) => {
    const app =
      this.apps.get(id) ??
      App.create({
        domains,
        id,
        name,
        owner,
      })

    app.writeCache({
      domains,
      name,
    })

    this.apps.set(app.id, app)

    return app
  }

  app(id: string) {
    return this.apps.get(id)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get elementDomainService() {
    return getElementDomainService(this)
  }

  @computed
  private get pageDomainService() {
    return getPageDomainService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
