import type { Nullish } from '@codelab/shared/abstract/types'

export interface IAdminService {
  exportData(): Promise<unknown>
  importData(): Promise<unknown>
  resetData(): Promise<Nullish<boolean>>
}
