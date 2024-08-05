import type {
  IDomainModel,
  IDomainRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  DomainOptions,
  DomainUniqueWhere,
  DomainWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import { domainApi } from './domain.api'

export const domainRepository: IDomainRepository = {
  add: async (domain: IDomainModel) => {
    const {
      createDomains: { domains },
    } = await domainApi.CreateDomains({
      input: domain.toCreateInput(),
    })

    const createdDomain = domains[0]

    assertIsDefined(createdDomain)

    return createdDomain
  },

  delete: async (domains: Array<IDomainModel>) => {
    const {
      deleteDomains: { nodesDeleted },
    } = await domainApi.DeleteDomains({
      where: {
        id_IN: domains.map((domain) => domain.id),
      },
    })

    return nodesDeleted
  },

  find: async (where: DomainWhere = {}, options?: DomainOptions) => {
    return domainApi.DomainList({ options, where })
  },

  findOne: async (where: DomainUniqueWhere) => {
    return (await domainRepository.find(where)).items[0]
  },

  update: async (domain: IDomainModel) => {
    const {
      updateDomains: { domains },
    } = await domainApi.UpdateDomains({
      update: domain.toUpdateInput(),
      where: { id: domain.id },
    })

    const updatedDomain = domains[0]

    assertIsDefined(updatedDomain)

    return updatedDomain
  },
}
