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
  @IsOptional()
  @IsString()
  icon?: string | null | undefined

  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  externalCssSource: string | null | undefined

  @IsOptional()
  @IsString()
  externalJsSource: string | null | undefined

  @IsOptional()
  @IsString()
  externalSourceType: string | null | undefined

  // Assuming this is a string, add validators as per actual type
  type: IAtomType

  api: IEntity | undefined

  @IsArray()
  tags: Array<IEntity>

  @IsArray()
  requiredParents: Array<IEntity>

  @IsArray()
  suggestedChildren: Array<IEntity>

  // Assuming this is a string, add validators as per actual type
  owner: IAuth0User

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
