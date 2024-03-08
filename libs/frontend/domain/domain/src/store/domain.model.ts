import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type {
  DomainDeleteInput,
  VercelDomainConfig,
  VercelProjectDomain,
} from '@codelab/shared/abstract/codegen'
import type { IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ app, domainConfig, id, name, projectDomain }: IDomainDto) => {
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
    app: prop<IRef>(),
    domainConfig: prop<Maybe<VercelDomainConfig>>(),
    id: idProp,
    name: prop<string>(),
    projectDomain: prop<Maybe<VercelProjectDomain>>(),
  })
  implements IDomainModel
{
  static create = create

  static toDeleteInput(): DomainDeleteInput {
    return {}
  }

  @computed
  get toJson() {
    return {
      $modelType: 'serialized',
      app: this.app,
      domainConfig: this.domainConfig,
      id: this.id,
      name: this.name,
      projectDomain: this.projectDomain,
    }
  }

  @modelAction
  public writeCache({
    app,
    domainConfig,
    id,
    name,
    projectDomain,
  }: Partial<IDomainDto>) {
    this.name = name ?? this.name
    this.domainConfig = domainConfig ?? this.domainConfig
    this.projectDomain = projectDomain ?? this.projectDomain
    this.app = app ?? this.app

    return this
  }

  toCreateInput() {
    return {
      app: connectNodeId(this.app.id),
      id: this.id,
      name: this.name,
    }
  }

  toUpdateInput() {
    return {
      name: this.name,
    }
  }
}
