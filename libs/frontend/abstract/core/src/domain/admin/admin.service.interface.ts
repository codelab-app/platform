import type { AxiosResponse } from 'axios'
import type { IEntityModalService } from '../../service'
import type { IApp } from '../app'

export interface IAdminService {
  exportDataModal: IEntityModalService
  exportData(): Promise<unknown>
  importApp(appData: string): Promise<Array<IApp>>
  importData(): Promise<unknown>
  resetData(): Promise<AxiosResponse>
}
