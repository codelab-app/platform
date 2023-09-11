import type { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'
import type { IEntityModalService } from '../../service'
import type { IApp } from '../app'

export interface IAdminService {
  exportDataModal: IEntityModalService
  importDataModal: IEntityModalService

  exportData(data: ExportDto): Promise<unknown>
  importApp(appData: string): Promise<Array<IApp>>
  importData(data: ImportDto): Promise<unknown>
  resetData(): Promise<AxiosResponse>
}
