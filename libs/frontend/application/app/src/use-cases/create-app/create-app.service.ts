import type {
  IAppDomainService,
  ICreateAppData,
  IDomainStore,
} from '@codelab/frontend/abstract/domain'
import { getAppRepository } from '../../services'

export const useCreateAppService =
  ({ appDomainService, userDomainService }: IDomainStore) =>
  ({ id, name }: ICreateAppData) => {
    const app = appDomainService.create({
      id,
      name,
      owner: userDomainService.user,
      pages: [],
    })

    return getAppRepository().add(app)
  }
