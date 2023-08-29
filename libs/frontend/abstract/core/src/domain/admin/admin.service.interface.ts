import type { AxiosResponse } from 'axios'

export interface IAdminService {
  exportData(): Promise<unknown>
  importData(): Promise<unknown>
  resetData(): Promise<AxiosResponse>
}
