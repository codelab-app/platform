import type { IDomainDto, IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import type { DomainOptions, DomainWhere } from '@codelab/shared/infra/gqlgen'

import {
  type IDomainModel,
  type IDomainRepository,
} from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  domainMapper,
  domainServerActions,
} from '@codelab/shared-domain-module/domain'

const { CreateDomains, DeleteDomains, DomainList, UpdateDomains } =
  domainServerActions

export const domainRepository: IDomainRepository = {
  add: async (domain: IDomainDto, next?: NextFetchOptions) => {
    const {
      createDomains: { domains },
    } = await CreateDomains(
      {
        input: domainMapper.toCreateInput(domain),
      },
      next,
    )

    const createdDomain = domains[0]

    Validator.assertsDefined(createdDomain)

    return createdDomain
  },

  delete: async (domains: Array<IDomainModel>, next?: NextFetchOptions) => {
    const {
      deleteDomains: { nodesDeleted },
    } = await DeleteDomains(
      {
        where: {
          id_IN: domains.map((domain) => domain.id),
        },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where: DomainWhere = {},
    options?: DomainOptions,
    next?: NextFetchOptions,
  ) => {
    return DomainList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: DomainWhere, next?: NextFetchOptions) => {
    return (await domainRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, domain: IDomainDto, next?: NextFetchOptions) => {
    const {
      updateDomains: { domains },
    } = await UpdateDomains(
      {
        update: domainMapper.toUpdateInput(domain),
        where: { id },
      },
      next,
    )

    const updatedDomain = domains[0]

    Validator.assertsDefined(updatedDomain)

    return updatedDomain
  },
}
