import type { IPropDto, IRef } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

export class Prop implements IPropDto {
  api?: Nullable<IRef> | undefined

  data: string

  id: string

  constructor({ api, data, id }: IPropDto) {
    this.id = id
    this.api = api
    this.data = data
  }
}
