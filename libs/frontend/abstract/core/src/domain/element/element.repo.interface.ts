import type { ElementWhere } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IElement } from './element.model.interface'

export type IElementRepository = IRepository<IElement, IEntity, ElementWhere>
