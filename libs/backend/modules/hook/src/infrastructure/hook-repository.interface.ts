import { IBaseRepository } from '@codelab/backend/infra'
import { IHook } from '@codelab/shared/abstract/core'

export type IHookRepository = IBaseRepository<IHook>

export const IHookRepositoryToken = Symbol('HookRepository')
