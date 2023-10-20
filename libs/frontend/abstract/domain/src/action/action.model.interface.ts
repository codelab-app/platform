import type {
  IApiAction,
  IApiActionModel,
  ICodeAction,
  ICodeActionModel,
} from './actions'

export type IActionModel = IApiActionModel | ICodeActionModel

export type IAction = IApiAction | ICodeAction
