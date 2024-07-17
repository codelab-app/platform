import type {
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import { updateDomainRepository } from '@codelab/frontend-domain-domain/repositories'

export const updateDomainUseCase = async (
  domain: IDomainModel,
  update: IUpdateDomainData,
) => {
  domain.writeCache(update)

  await updateDomainRepository({
    update: domain.toUpdateInput(),
    where: { id: domain.id },
  })
}
