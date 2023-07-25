import type { IAuth0User, ITagDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Tag implements ITagDTO {
  declare id: string

  declare name: string

  owner: IAuth0User

  children: Array<IEntity>

  parent?: IEntity | null

  descendants: Array<IEntity>

  constructor({
    children = [],
    descendants = [],
    id,
    name,
    owner,
    parent = null,
  }: ITagDTO) {
    this.id = id
    this.name = name
    this.children = children
    this.parent = parent
    this.owner = owner
    this.descendants = descendants
  }
}
