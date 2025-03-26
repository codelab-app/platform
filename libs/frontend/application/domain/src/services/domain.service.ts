import type {
  ICreateDomainData,
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import type { DomainWhere } from '@codelab/shared/infra/gqlgen'

import { type IDomainService } from '@codelab/frontend/abstract/application'
import {
  domainRepository,
  invalidateDomainListQuery,
} from '@codelab/frontend-domain-domain/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const useDomainService = (): IDomainService => {
  const { domainDomainService } = useDomainStore()

  const create = async (domainData: ICreateDomainData) => {
    const domain = domainDomainService.hydrate({
      ...domainData,
      domainConfig: undefined,
    })

    await domainRepository.add(domain, {
      revalidateTags: [CACHE_TAGS.Domain.list()],
    })

    // Fetching again to get the backend-generated domainConfig
    await invalidateDomainListQuery()

    return domain
  }

  const removeMany = async (domains: Array<IDomainModel>): Promise<number> => {
    const deleteDomain = async (domain: IDomainModel) => {
      const { id } = domain

      domainDomainService.domains.delete(id)
      await domainRepository.delete([domain], {
        revalidateTags: [CACHE_TAGS.Domain.list()],
      })

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
    return await domainRepository.update({ id: domain.id }, domain, {
      revalidateTags: [CACHE_TAGS.Domain.list()],
    })
  }

  return {
    create,
    getAll,
    removeMany,
    update,
  }
}
