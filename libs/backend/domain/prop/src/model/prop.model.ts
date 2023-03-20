import type { IPropDTO } from '@codelab/frontend/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'

export class Prop implements IPropDTO {
  api?: Nullable<IEntity> | undefined

  data?: string | undefined

  id: string

  constructor({ api, data, id }: IPropDTO) {
    this.id = id
    this.api = api
    this.data = data
  }
}
