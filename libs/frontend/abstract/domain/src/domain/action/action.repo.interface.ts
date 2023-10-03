import type { IRepository } from '../../service'
import type { IActionModel } from './action.model.interface'
import type { IActionOptions, IActionWhere } from './action.where.interface'
import type { ActionFragment } from './fragments'

export type IActionRepository = IRepository<
  IActionModel,
  ActionFragment,
  IActionWhere,
  IActionOptions
>
