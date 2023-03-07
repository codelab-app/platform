import type { IDomain, IDomainDTO } from '@codelab/frontend/abstract/core'
import type {
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const create = ({ id, name, app, domainConfig, projectDomain }: IDomainDTO) => {
  return new Domain({
    app,
    domainConfig,
    id,
    name,
    projectDomain,
  })
}

@model('@codelab/Domain')
export class Domain
  extends Model({
    app: prop<IEntity>(),
    domainConfig: prop<VercelDomainConfig>(),
    id: idProp,
    name: prop<string>(),
    projectDomain: prop<VercelProjectDomain>(),
  })
  implements IDomain
{
  static create = create

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

export const domainRef = rootRef<IDomain>('@codelab/DomainRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
