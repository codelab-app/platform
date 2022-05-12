import { Nullish } from '@codelab/shared/abstract/types'

export interface IAdminService {
  resetData(): Promise<Nullish<boolean>>
}
