import type { ActionFragment } from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IActionModel } from './action.model.interface'
import type { IActionOptions, IActionWhere } from './action.where.interface'

export type IActionRepository = IRepository<
  IActionModel,
  ActionFragment,
  IActionWhere,
  IActionOptions
>
