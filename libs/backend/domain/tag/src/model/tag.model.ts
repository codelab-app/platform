import type { IRef, ITagDto } from '@codelab/shared/abstract/core'

export class Tag implements ITagDto {
  children: Array<IRef>

  descendants: Array<IRef>

  id: string

  name: string

  owner: IRef

  parent?: IRef | null

  constructor({
    children = [],
    descendants = [],
    id,
    name,
    owner,
    parent = null,
  }: ITagDto) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.descendants = descendants
    this.owner = owner
  }
}
