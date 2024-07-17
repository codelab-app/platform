import type {
  IDomainModel,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import { deleteDomainsRepository } from '@codelab/frontend-domain-domain/repositories'

export const deleteDomainUseCase = async (
  domain: IDomainModel,
  { domainDomainService }: IDomainStore,
) => {
  domainDomainService.domains.delete(domain.id)

  await deleteDomainsRepository({
    where: {
      id: domain.id,
    },
  })
}
