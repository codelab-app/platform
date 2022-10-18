import { IDomain, IDomainDTO } from '@codelab/frontend/abstract/core'
import {
  VercelDomainConfig,
  VercelProjectDomain,
  // VercelProjectDomainData,
} from '@codelab/shared/abstract/codegen'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (domain: IDomainDTO) => {
  return new Domain({
    id: domain.id,
    name: domain.name,
    // app: domain.app.id,
    domainConfig: domain.domainConfig,
    projectDomain: domain.projectDomain,
  })
}

@model('@codelab/Domain')
export class Domain
  extends Model({
    id: idProp,
    name: prop<string>(),
    // app: prop<IApp>(),
    domainConfig: prop<VercelDomainConfig>(),
    projectDomain: prop<VercelProjectDomain>(),
  })
  implements IDomain
{
  static hydrate = hydrate

  @modelAction
  public writeCache(data: IDomainDTO) {
    this.id = data.id
    this.name = data.name
    this.domainConfig = data.domainConfig
    this.projectDomain = data.projectDomain

    return this
  }
}

export const domainRef = rootRef<IDomain>('@codelab/AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
