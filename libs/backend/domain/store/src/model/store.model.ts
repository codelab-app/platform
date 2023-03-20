import type { IStoreDTO } from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Store implements IStoreDTO {
  actions?: Array<IEntity> | undefined

  api: IEntity

  id: string

  name: string

  constructor({ api, id, name }: IStoreDTO) {
    this.api = api
    this.id = id
    this.name = name
  }
}
