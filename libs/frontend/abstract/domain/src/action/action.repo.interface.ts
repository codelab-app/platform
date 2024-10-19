import type { ActionFragment } from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type {
  IActionCreateInput,
  IActionDeleteInput,
  IActionUpdateInput,
} from './action.input.interface'
import type { IActionModel } from './action.model.interface'
import type { IActionOptions, IActionWhere } from './action.where.interface'

export type IActionRepository = IRepository<
  IActionCreateInput,
  IActionUpdateInput,
  IActionDeleteInput,
  ActionFragment,
  IActionWhere,
  IActionOptions
>
