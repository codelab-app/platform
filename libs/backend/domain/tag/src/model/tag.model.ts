import type { ITagDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Tag implements ITagDTO {
  id: string

  name: string

  children: Array<IEntity>

  parent?: IEntity | null

  descendants: Array<IEntity>

  constructor({
    children = [],
    descendants = [],
    id,
    name,
    parent = null,
  }: ITagDTO) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.descendants = descendants
  }
}
