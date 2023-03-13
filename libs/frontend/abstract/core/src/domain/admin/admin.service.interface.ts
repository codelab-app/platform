import type { Nullish } from '@codelab/shared/abstract/types'

export interface IAdminService {
  resetData(): Promise<Nullish<boolean>>
  export(): Promise<unknown>
  import(): Promise<unknown>
}
