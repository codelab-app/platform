import { type IDomainService } from '@codelab/frontend/abstract/application'
import type {
  ICreateDomainData,
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import { domainRepository } from '@codelab/frontend-domain-domain/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { DomainWhere } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import { invalidateDomainListQuery } from '../use-cases/domain-list'

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

  const remove = async (domains: Array<IDomainModel>): Promise<number> => {
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

  const update = async ({ id, name }: IUpdateDomainData) => {
    const domain = domainDomainService.domains.get(id)

    Validator.assertsDefined(domain)

    domain.writeCache({ name })
    await domainRepository.update(domain)

    // Fetching again to get the backend-generated domainConfig

    const [updatedDomain] = await getAll({ id: domain.id })

    return updatedDomain || domain
  }

  return {
    create,
    getAll,
    remove,
    update,
  }
}
