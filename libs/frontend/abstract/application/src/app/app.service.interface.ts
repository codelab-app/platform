import type {
  IAppModel,
  ICreateAppData,
  IUpdateAppData,
} from '@codelab/frontend/abstract/domain'
import type { App, AppOptions, AppWhere } from '@codelab/frontend/infra/gql'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { ICRUDService, IQueryService } from '../services'

// export interface IAppService {
//   createApp(appDto: IAppDto, appDomainService: IAppDomainService): Promise<void>
//   deleteApp(app: IAppModel): Promise<void>
//   exportApp(app: IRef): Promise<object>
//   importApp(appDataFile: File): Promise<IAppDto>
//   updateApp(app: IAppModel, data: IUpdateAppData): Promise<void>
// }

export interface IAppService
  extends ICRUDService<IAppModel, ICreateAppData, IUpdateAppData>,
    IQueryService<IAppModel, AppWhere, AppOptions> {
  // exportApp(app: IAppModel): Promise<unknown>
  importApp(appDataFile: File): Promise<App>
  regeneratePages(app: IAppModel, pagesUrls?: Array<string>): Promise<void>
  updatePage(data: IUpdatePageData): Promise<void>
}
