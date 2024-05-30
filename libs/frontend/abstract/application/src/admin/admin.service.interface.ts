import type { IExportDto, IImportDto } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'
import type { IModalService } from '../services'

export interface IAdminService {
  exportDataModal: IModalService
  importDataModal: IModalService

  exportData(data: IExportDto): Promise<unknown>
  importData(data: IImportDto): Promise<unknown>
  resetDatabase(): Promise<AxiosResponse>
  resetDatabaseExceptUser(): Promise<AxiosResponse>
}
