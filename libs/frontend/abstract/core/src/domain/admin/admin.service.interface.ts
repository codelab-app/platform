import type { Nullish } from '@codelab/shared/abstract/types'

export interface IAdminService {
  export(): Promise<unknown>
  import(): Promise<unknown>
  resetData(): Promise<Nullish<boolean>>
}
