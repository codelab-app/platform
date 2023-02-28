import type { IDomain, IDomainDTO } from '@codelab/frontend/abstract/core'
import type {
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
import { travelSchemaPossibleExtensions } from '@graphql-tools/merge'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

@model('@codelab/Domain')
export class Domain
  extends Model({
    id: idProp,
    name: prop<string>(),
    app: prop<IEntity>(),
    domainConfig: prop<VercelDomainConfig>(),
    projectDomain: prop<VercelProjectDomain>(),
  })
  implements IDomain
{
  static create(domain: IDomainDTO) {
    return new Domain({
      id: domain.id,
      name: domain.name,
      app: domain.app,
      domainConfig: domain.domainConfig,
      projectDomain: domain.projectDomain,
    })
  }

  @modelAction
  public writeCache({
    id,
    name,
    domainConfig,
    projectDomain,
    app,
  }: Partial<IDomainDTO>) {
    this.name = name ?? this.name
    this.domainConfig = domainConfig ?? this.domainConfig
    this.projectDomain = projectDomain ?? this.projectDomain
    this.app = app ?? this.app

    return this
  }
}

export const domainRef = rootRef<IDomain>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
