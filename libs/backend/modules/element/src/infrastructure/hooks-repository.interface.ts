import { IBaseRepository } from '@codelab/backend/abstract/core'
import { IHook } from '@codelab/shared/abstract/core'

export type IHooksRepository = IBaseRepository<IHook>

export const IHooksRepositoryToken = Symbol('HooksRepository')
