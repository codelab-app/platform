import type { IPropDTO, IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

export class Prop implements IPropDTO {
  api?: Nullable<IRef> | undefined

  data: string

  id: string

  constructor({ api, data, id }: IPropDTO) {
    this.id = id
    this.api = api
    this.data = data
  }
}
