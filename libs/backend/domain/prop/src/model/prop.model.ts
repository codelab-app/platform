import type { IProp, IPropDto } from '@codelab/shared/abstract/core'
import type { ObjectLike } from '@codelab/shared/abstract/types'

export class Prop implements IProp {
  data: ObjectLike

  id: string

  constructor({ data, id }: IPropDto) {
    this.id = id
    this.data = JSON.parse(data)
  }
}
