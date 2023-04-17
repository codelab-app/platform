import type { IProp } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface IStoreDTO {
  actions?: Array<IEntity>
  api: IEntity
  component?: IEntity | null
  id: string
  initialState?: IProp
  name: string
  page?: IEntity | null
}
