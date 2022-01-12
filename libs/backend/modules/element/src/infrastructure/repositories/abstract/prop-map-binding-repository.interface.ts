import { IBaseRepository } from '@codelab/backend/infra'
import { IPropMapBinding } from '@codelab/shared/abstract/core'

export type IPropMapBindingsRepository = IBaseRepository<IPropMapBinding>

export const IPropMapBindingsRepositoryToken = Symbol(
  'PropMapBindingsRepository',
)
