import type { IAppService } from '@codelab/frontend/abstract/application'
import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { invalidateAppListQuery } from '../app-list'
import { createAppRepository } from './create-app.repository'

export const createAppUseCase: IAppService['createAppUseCase'] = async (
  appDto: IAppDto,
  appDomainService: IAppDomainService,
) => {
  const appModel = appDomainService.create(appDto)

  await createAppRepository(appModel.toCreateInput())

  await invalidateAppListQuery()
}
