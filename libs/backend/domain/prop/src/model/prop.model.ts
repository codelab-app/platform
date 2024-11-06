import type { IProp, IPropDto, IRef } from '@codelab/shared/abstract/core'
import type { Nullable, ObjectLike } from '@codelab/shared/abstract/types'

export class Prop implements IProp {
  api?: Nullable<IRef> | undefined

  data: ObjectLike

  id: string

  constructor({ api, data, id }: IPropDto) {
    this.id = id
    this.api = api
    this.data = JSON.parse(data)
  }
}
