import type {
  ICreateDomainData,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import { createDomainRepository } from '@codelab/frontend-domain-domain/repositories'
import { invalidateDomainListQuery } from '../domain-list'

export const createDomainUseCase = async (
  domainData: ICreateDomainData,
  { domainDomainService }: IDomainStore,
) => {
  const domain = domainDomainService.hydrate({
    ...domainData,
    domainConfig: undefined,
  })

  await createDomainRepository({ input: domain.toCreateInput() })

  // Fetching again to get the backend-generated domainConfig
  invalidateDomainListQuery()
}
