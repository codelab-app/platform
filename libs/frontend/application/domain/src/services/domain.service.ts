import type {
  ICreateDomainData,
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { DomainWhere } from '@codelab/shared/infra/gql'

import { type IDomainService } from '@codelab/frontend/abstract/application'
import {
  domainRepository,
  invalidateDomainListQuery,
} from '@codelab/frontend-domain-domain/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'

export const useDomainService = (): IDomainService => {
  const { domainDomainService } = useDomainStore()

  const create = async (domainData: ICreateDomainData) => {
    const domain = domainDomainService.hydrate({
      ...domainData,
      domainConfig: undefined,
    })

    await domainRepository.add(domain)

    // Fetching again to get the backend-generated domainConfig
    invalidateDomainListQuery()

    return domain
  }

  const removeMany = async (domains: Array<IDomainModel>): Promise<number> => {
    const deleteDomain = async (domain: IDomainModel) => {
      const { id } = domain

      domainDomainService.domains.delete(id)
      await domainRepository.delete([domain])

      return domain
    }

    const count = (
      await Promise.all(domains.map((domain) => deleteDomain(domain)))
    ).length

    return count
  }

  const getAll = async (where?: DomainWhere) => {
    const { items: domains } = await domainRepository.find(where)

    return domains.map((domain) => domainDomainService.hydrate(domain))
  }

  const update = async (domain: IUpdateDomainData) => {
    return await domainRepository.update({ id: domain.id }, domain)
  }

  const getOneFromCache = (ref: IRef) => {
    return domainDomainService.domains.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(domainDomainService.domains.values())
  }

  return {
    create,
    getAll,
    getAllFromCache,
    getOneFromCache,
    removeMany,
    update,
  }
}
