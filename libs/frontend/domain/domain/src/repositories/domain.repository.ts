import type { IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type {
  DomainOptions,
  DomainUniqueWhere,
  DomainWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IDomainModel,
  type IDomainRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/schema'
import { domainMapper } from '@codelab/shared-domain-module/domain'
import { revalidateTag } from 'next/cache'

import {
  CreateDomains,
  DeleteDomains,
  DomainList,
  UpdateDomains,
} from './domain.api.graphql.web.gen'

export const domainRepository: IDomainRepository = {
  add: async (domain: IDomainDto) => {
    const {
      createDomains: { domains },
    } = await CreateDomains({
      input: domainMapper.toCreateInput(domain),
    })

    const createdDomain = domains[0]

    Validator.assertsDefined(createdDomain)

    return createdDomain
  },

  delete: async (domains: Array<IDomainModel>) => {
    const {
      deleteDomains: { nodesDeleted },
    } = await DeleteDomains({
      where: {
        id_IN: domains.map((domain) => domain.id),
      },
    })

    return nodesDeleted
  },

  find: async (where: DomainWhere = {}, options?: DomainOptions) => {
    return DomainList({ options, where })
  },

  findOne: async (where: DomainUniqueWhere) => {
    return (await domainRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, domain: IDomainDto) => {
    const {
      updateDomains: { domains },
    } = await UpdateDomains({
      update: domainMapper.toUpdateInput(domain),
      where: { id },
    })

    const updatedDomain = domains[0]

    Validator.assertsDefined(updatedDomain)

    return updatedDomain
  },
}

export const invalidateDomainListQuery = () =>
  revalidateTag(CACHE_TAGS.DOMAIN_LIST)
