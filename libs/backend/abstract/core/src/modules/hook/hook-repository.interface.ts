import { IHook } from '@codelab/shared/abstract/core'
import { IBaseRepository } from '../../secondary'

export type IHookRepository = IBaseRepository<IHook>

export const IHookRepositoryToken = Symbol('HookRepository')
