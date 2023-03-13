import type { IAtom } from '@codelab/backend/abstract/core'
import type { IAtomDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Atom implements IAtomDTO {
  icon?: string | null | undefined

  id: string

  name: string

  type: IAtomType

  api: IEntity

  tags: Array<IEntity>

  allowedChildren: Array<IEntity>

  owner: IAuth0Owner

  constructor({
    allowedChildren = [],
    api,
    icon,
    id,
    name,
    owner,
    tags,
    type,
  }: IAtom) {
    this.id = id
    this.name = name
    this.icon = icon
    this.type = type
    this.api = api
    this.tags = tags
    this.allowedChildren = allowedChildren
    this.owner = owner
  }
}
