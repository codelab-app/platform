import type { IRepository } from '../../service'
import type { IAction } from './action.interface'
import type { IActionWhere } from './action.where.interface'
import type { ActionFragment } from './fragments'

export type IActionRepository = IRepository<
  IAction,
  ActionFragment,
  IActionWhere
>
