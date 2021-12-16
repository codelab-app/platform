import { IBaseRepository } from '@codelab/backend/infra'
import { IProp } from '@codelab/shared/abstract/core'

export type IPropRepository = IBaseRepository<IProp>

export const IPropRepositoryToken = Symbol('PropRepository')
