import { Nullish } from '@codelab/shared/abstract/types'
import { AdminExportPayload } from './admin.payload.interface'

export interface IAdminService {
  resetData(): Promise<Nullish<boolean>>
  exportData(): Promise<string>
  importData(
    payloadString: AdminExportPayload,
    currentUserAuth0Id: string,
  ): Promise<void>
}
