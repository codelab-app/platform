import { IBaseRepository } from '@codelab/backend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'

export type IElementRepository = IBaseRepository<IElement>

export const IElementRepositoryToken = Symbol('ElementRepository')
