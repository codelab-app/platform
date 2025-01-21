import type { IActionDto } from '@codelab/shared/abstract/core'
import type { ActionFragment } from '@codelab/shared/infra/gqlgen'

import type { IRepository } from '../shared'
import type { IActionOptions, IActionWhere } from './action.where.interface'

export type IActionRepository = IRepository<
  IActionDto,
  ActionFragment,
  IActionWhere,
  IActionOptions
>
