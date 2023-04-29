import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IAction } from './action.interface'
import type { IActionOptions, IActionWhere } from './action.where.interface'

export type IActionRepository = IRepository<
  IAction,
  IEntity,
  IActionWhere,
  IActionOptions
>
