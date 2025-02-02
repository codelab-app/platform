import type { IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { DomainOptions, DomainWhere } from '@codelab/shared/infra/gqlgen'

import {
  CACHE_TAGS,
  type IDomainModel,
  type IDomainRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  domainMapper,
  domainServerActions,
} from '@codelab/shared-domain-module/domain'
import { revalidateTag } from 'next/cache'

const { CreateDomains, DeleteDomains, DomainList, UpdateDomains } =
  domainServerActions

export const domainRepository: IDomainRepository = {
  add: async (domain: IDomainDto) => {
    const {
      createDomains: { domains },
    } = await CreateDomains(
      {
        input: domainMapper.toCreateInput(domain),
      },
      {
        tags: [CACHE_TAGS.DOMAIN_LIST],
      },
    )

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
    return DomainList({ options, where }, { tags: [CACHE_TAGS.DOMAIN_LIST] })
  },

  // FIXME: make a unique where
  findOne: async (where: DomainWhere) => {
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
