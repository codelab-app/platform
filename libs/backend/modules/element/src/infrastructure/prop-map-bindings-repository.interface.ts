import { IBaseRepository } from '@codelab/backend/abstract/core'
import { IPropMapBinding } from '@codelab/shared/abstract/core'

export type IPropMapBindingsRepository = IBaseRepository<IPropMapBinding>

export const IPropMapBindingsRepositoryToken = Symbol(
  'PropMapBindingsRepository',
)
