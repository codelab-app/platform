import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export interface IStoreDTO {
  api: IEntity
  component?: IEntity | null
  id: string
  name: string
  page?: IEntity | null
  sourceStore?: Nullable<IEntity>
}
