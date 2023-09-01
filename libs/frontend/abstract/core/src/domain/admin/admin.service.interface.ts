import type { AxiosResponse } from 'axios'
import type { IApp } from '../app'

export interface IAdminService {
  exportData(): Promise<unknown>
  importApp(appData: string): Promise<Array<IApp>>
  importData(): Promise<unknown>
  resetData(): Promise<AxiosResponse>
}
