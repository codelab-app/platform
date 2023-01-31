import type {
  IAtom,
  IInterfaceType,
  ITag,
} from '@codelab/backend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Atom implements IAtom {
  icon?: string | null | undefined

  id: string

  name: string

  type: IAtomType

  api: IInterfaceType

  tags: Array<ITag>

  allowedChildren: Array<IEntity>

  constructor({
    id,
    name,
    icon,
    type,
    api,
    tags,
    allowedChildren = [],
  }: IAtom) {
    this.id = id
    this.name = name
    this.icon = icon
    this.type = type
    this.api = api
    this.tags = tags
    this.allowedChildren = allowedChildren
  }
}
