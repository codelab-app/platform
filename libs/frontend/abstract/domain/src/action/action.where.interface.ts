import type {
  ApiActionOptions,
  ApiActionWhere,
  CodeActionOptions,
  CodeActionWhere,
} from '@codelab/shared/infra/gqlgen'

export type IActionWhere = ApiActionWhere & CodeActionWhere

export type IActionOptions = ApiActionOptions & CodeActionOptions
