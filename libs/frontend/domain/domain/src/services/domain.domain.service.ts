import {
  type IDomainDomainService,
  type IDomainModel,
} from '@codelab/frontend/abstract/domain'
import type { IDomainDto } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { merge } from 'remeda'
import { Domain } from '../store'

@model('@codelab/DomainDomainService')
export class DomainDomainService
  extends Model({
    domains: prop(() => objectMap<IDomainModel>()),
  })
  implements IDomainDomainService
{
  @computed
  get domainsJson() {
    return this.domainsList.map((domain) => domain.toJson).reduce(merge, {})
  }

  @computed
  get domainsList() {
    return [...this.domains.values()]
  }

  @modelAction
  hydrate = (dto: IDomainDto) => {
    let domain = this.domains.get(dto.id)

    domain = domain ? domain.writeCache(dto) : Domain.create(dto)

    this.domains.set(domain.id, domain)

    return domain
  }

  domain(id: string) {
    return this.domains.get(id)
  }
}
