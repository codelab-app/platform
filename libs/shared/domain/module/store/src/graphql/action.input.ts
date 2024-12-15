import type {
  ApiActionFragment,
  ApiActionOptions,
  ApiActionWhere,
  CodeActionFragment,
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/shared/infra/gql'

export type IActionFragment = ApiActionFragment | CodeActionFragment

export type IActionWhere = ApiActionWhere | CodeActionWhere

export type IActionOptions = ApiActionOptions | CodeActionOptions
