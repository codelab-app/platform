import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type { IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  DeleteDomainsMutationVariables,
  DomainDeleteInput,
  ProductionDomainConfig,
} from '@codelab/shared/infra/gql'

import { connectNodeId } from '@codelab/shared/domain-old'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ app, domainConfig, id, name }: IDomainDto) => {
  return new Domain({
    app,
    domainConfig,
    id,
    name,
  })
}

@model('@codelab/Domain')
export class Domain
  extends Model({
    app: prop<IRef>(),
    domainConfig: prop<Maybe<ProductionDomainConfig>>(),
    id: idProp,
    name: prop<string>(),
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
    }
  }

  @modelAction
  public writeCache({ app, domainConfig, name }: Partial<IDomainDto>) {
    this.name = name ?? this.name
    this.domainConfig = domainConfig ?? this.domainConfig
    this.app = app ?? this.app

    return this
  }
}
