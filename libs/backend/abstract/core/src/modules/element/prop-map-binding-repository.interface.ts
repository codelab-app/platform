import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { IBaseRepository } from '../../secondary'

export type IPropMapBindingsRepository = IBaseRepository<IPropMapBinding>

export const IPropMapBindingsRepositoryToken = Symbol(
  'PropMapBindingsRepository',
)
