import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import type { IAppDto } from '@codelab/shared/abstract/core'

export interface IAppService {
  createAppUseCase(
    appDto: IAppDto,
    appDomainService: IAppDomainService,
  ): Promise<void>
}
