import type {
  IActionModel,
  IActionOptions,
  IActionWhere,
} from '@codelab/frontend/abstract/domain'
import type { ActionFragment } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IActionRepository = IRepository<
  IActionModel,
  ActionFragment,
  IActionWhere,
  IActionOptions
>
