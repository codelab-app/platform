import type { IEntity } from '@codelab/shared/abstract/types'

export interface IStoreDTO {
  actions?: Array<IEntity>
  api: IEntity
  id: string
  name: string
}
