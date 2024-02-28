import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'
import type { IModalService } from '../services'

export interface IAdminService {
  exportDataModal: IModalService
  importDataModal: IModalService

  exportData(data: ExportDto): Promise<unknown>
  importApp(appDataFile: File): Promise<Array<IAppModel>>
  importData(data: ImportDto): Promise<unknown>
  resetDatabase(): Promise<AxiosResponse>
  resetDatabaseExceptUser(): Promise<AxiosResponse>
}
