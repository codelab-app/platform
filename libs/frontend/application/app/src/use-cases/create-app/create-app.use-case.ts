import type { IAppService } from '@codelab/frontend/abstract/application'
import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import { createAppRepository } from '@codelab/frontend-domain-app/repositories'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { invalidateAppListQuery } from '../app-list'

export const createAppUseCase: IAppService['createApp'] = async (
  appDto: IAppDto,
  appDomainService: IAppDomainService,
) => {
  const app = appDomainService.create(appDto)

  await createAppRepository(app)

  await invalidateAppListQuery()
}
