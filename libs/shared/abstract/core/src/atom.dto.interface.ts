import type { IEntity } from '@codelab/shared/abstract/types'
import type { IAtomType } from './atom-type.enum'
import type { IOwner } from './user.interface'

export interface IAtomDTO extends IOwner {
  api: IEntity
  icon?: string | null
  id: string
  name: string
  requiredParents?: Array<IEntity>
  suggestedChildren?: Array<IEntity>
  tags?: Array<IEntity>
  type: IAtomType
}
