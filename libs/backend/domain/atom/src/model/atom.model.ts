import type {
  IAtom,
  IAtomDto,
  IAtomType,
  IRef,
} from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import type { ValidationError } from 'class-validator'
import { validateSync } from 'class-validator'

export class Atom implements IAtom {
  __typename = `${IElementRenderTypeKind.Atom}` as const

  static create(data: IAtomDto): Atom {
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

  api: IRef

  externalCssSource: string | null | undefined

  externalJsSource: string | null | undefined

  externalSourceType: string | null | undefined

  icon?: string | null | undefined

  id: string

  name: string

  requiredParents: Array<IRef>

  suggestedChildren: Array<IRef>

  tags: Array<IRef>

  // Assuming this is a string, add validators as per actual type
  type: IAtomType

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
  }: IAtomDto) {
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
