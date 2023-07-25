import type { IEntity } from '@codelab/shared/abstract/types'
import type { IAtomType } from './atom-type.enum'
import type { IAuth0Owner } from './user.interface'

export interface IAtomDTO extends IOwner {
  api?: IEntity | undefined
  externalCssSource?: string | null
  externalJsSource?: string | null
  externalSourceType?: string | null
  icon?: string | null
  id: string
  name: string
  requiredParents?: Array<IEntity>
  suggestedChildren?: Array<IEntity>
  tags?: Array<IEntity>
  type: IAtomType
}
