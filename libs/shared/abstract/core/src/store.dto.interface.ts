import type { IEntity } from '@codelab/shared/abstract/types'

export interface IStoreDTO {
  actions?: Array<IEntity>
  api: IEntity
  component?: IEntity | null
  id: string
  name: string
  page?: IEntity | null
}
