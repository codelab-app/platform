import type { ElementWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { ElementFragment } from './element.fragment.graphql.gen'
import type { IElement } from './element.model.interface'

export type IElementRepository = IRepository<
  IElement,
  ElementFragment,
  ElementWhere
>
