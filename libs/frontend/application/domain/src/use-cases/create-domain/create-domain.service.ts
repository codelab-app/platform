import type {
  ICreateDomainData,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import { getDomainRepository } from '../../services'

export const useCreateDomainService =
  (domainStore: IDomainStore) => async (data: ICreateDomainData) => {
    const domain = this.hydrate({
      ...domainData,
      domainConfig: undefined,
    })

    await getDomainRepository().add(domain)

    // Fetching again to get the backend-generated domainConfig
    return this.getAll({ id: domain.id })))[0] || domain
  }
