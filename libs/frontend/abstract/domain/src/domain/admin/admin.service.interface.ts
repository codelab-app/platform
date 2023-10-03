import type { ExportDto, ImportDto } from '@codelab/shared/abstract/core'
import type { AxiosResponse } from 'axios'
import type { IEntityModalService } from '../../service'
import type { IAppModel } from '../app'

export interface IAdminService {
  exportDataModal: IEntityModalService
  importDataModal: IEntityModalService

  exportData(data: ExportDto): Promise<unknown>
  importApp(appData: string): Promise<Array<IAppModel>>
  importData(data: ImportDto): Promise<unknown>
  resetDatabase(): Promise<AxiosResponse>
  resetDatabaseExceptUser(): Promise<AxiosResponse>
  resetDatabaseExceptUserAndAtom(): Promise<AxiosResponse>
}
