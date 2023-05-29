import type {
  IAtomDTO,
  IAtomType,
  IAuth0Owner,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Atom implements IAtomDTO {
  icon?: string | null | undefined

  id: string

  name: string

  externalCssSource: string | null | undefined

  externalJsSource: string | null | undefined

  externalSourceType: string | null | undefined

  type: IAtomType

  api: IEntity

  tags: Array<IEntity>

  requiredParents: Array<IEntity>

  suggestedChildren: Array<IEntity>

  owner: IAuth0Owner

  constructor({
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
    id,
    name,
    owner,
    requiredParents = [],
    suggestedChildren = [],
    tags = [],
    type,
  }: IAtomDTO) {
    this.id = id
    this.externalJsSource = externalJsSource
    this.externalCssSource = externalCssSource
    this.externalSourceType = externalSourceType
    this.name = name
    this.icon = icon
    this.type = type
    this.api = api
    this.tags = tags
    this.requiredParents = requiredParents
    this.suggestedChildren = suggestedChildren
    this.owner = owner
  }
}
