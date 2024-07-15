import type {
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'
import { updateDomainRepository } from './update-domain.repository'

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
