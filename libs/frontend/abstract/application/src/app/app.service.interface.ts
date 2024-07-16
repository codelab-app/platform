import type {
  IAppDomainService,
  IAppModel,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import type { IAppDto, IRef } from '@codelab/shared/abstract/core'

export interface IAppService {
  createApp(appDto: IAppDto, appDomainService: IAppDomainService): Promise<void>
  deleteApp(app: IAppModel): Promise<void>
  exportApp(app: IRef): Promise<object>
  importApp(appData: FormData): Promise<IAppDto>
  updateApp(app: IAppModel, data: IUpdateAppData): Promise<void>
}
