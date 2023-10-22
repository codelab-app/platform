import type { IRef, ITagDTO } from '@codelab/shared/abstract/core'

export class Tag implements ITagDTO {
  children: Array<IRef>

  descendants: Array<IRef>

  id: string

  name: string

  parent?: IRef | null

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
