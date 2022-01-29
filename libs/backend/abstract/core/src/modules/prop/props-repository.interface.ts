import { IProp } from '@codelab/shared/abstract/core'
import { IBaseRepository } from '../../secondary'

export type IPropRepository = IBaseRepository<IProp>

export const IPropRepositoryToken = Symbol('PropRepository')
