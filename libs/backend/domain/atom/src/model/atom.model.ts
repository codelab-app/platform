import type {
  IAtomDTO,
  IAtomType,
  IAuth0User,
} from '@codelab/shared/abstract/core'
import { type IEntity } from '@codelab/shared/abstract/types'
import type { ValidationError } from 'class-validator'
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator'

export class Atom implements IAtomDTO {
  icon?: string | null | undefined

  id: string

  name: string

  externalCssSource: string | null | undefined

  externalJsSource: string | null | undefined

  externalSourceType: string | null | undefined

  // Assuming this is a string, add validators as per actual type
  type: IAtomType

  api: IEntity

  tags: Array<IEntity>

  requiredParents: Array<IEntity>

  suggestedChildren: Array<IEntity>

  static create(data: IAtomDTO): Atom {
    const atom = new Atom(data)
    const errors = validateSync(atom)

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .join(', ')

      throw new Error(message)
    }

    return atom
  }

  private constructor({
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
    id,
    name,
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
  }
}
