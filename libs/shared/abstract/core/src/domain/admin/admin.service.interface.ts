import { Nullish } from '@codelab/shared/abstract/types'

export interface IAdminService {
  resetData(): Promise<Nullish<boolean>>
  exportData(): Promise<string>
  importData(payloadString: string, currentUserAuth0Id: string): Promise<void>
}
