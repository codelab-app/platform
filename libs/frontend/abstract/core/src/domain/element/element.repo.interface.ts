import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IElement } from './element.model.interface'

export type IElementRepository = IRepository<
  IElement,
  ElementFragment,
  ElementWhere,
  DomainOptions
>
