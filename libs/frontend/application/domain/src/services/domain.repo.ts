import type { IDomainRepository } from '@codelab/frontend/abstract/application'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import type {
  DomainOptions,
  DomainUniqueWhere,
  DomainWhere,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { domainApis } from './domain.api'

export class DomainRepository implements IDomainRepository {
  async add(domain: IDomainModel) {
    const {
      createDomains: { domains },
    } = await domainApis.CreateDomains({
      input: domain.toCreateInput(),
    })

    const createdDomain = domains[0]

    assertIsDefined(createdDomain)

    return createdDomain
  }

  async delete(domains: Array<IDomainModel>) {
    const {
      deleteDomains: { nodesDeleted },
    } = await domainApis.DeleteDomains({
      where: {
        id_IN: domains.map((domain) => domain.id),
      },
    })

    return nodesDeleted
  }

  async find(
    this: DomainRepository,
    where: DomainWhere = {},
    options?: DomainOptions,
  ) {
    return domainApis.GetDomains({ options, where })
  }

  async findOne(where: DomainUniqueWhere) {
    return (await this.find(where)).items[0]
  }

  async update(domain: IDomainModel) {
    const {
      updateDomains: { domains },
    } = await domainApis.UpdateDomains({
      update: domain.toUpdateInput(),
      where: { id: domain.id },
    })

    const updatedDomain = domains[0]

    assertIsDefined(updatedDomain)

    return updatedDomain
  }
}

let domainRepository: IDomainRepository | undefined

export const getDomainRepository = () =>
  (domainRepository ??= new DomainRepository())
