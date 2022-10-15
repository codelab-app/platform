import {
  IActionDTO,
  IApiAction,
  ICodeAction,
} from '@codelab/frontend/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { ApiAction } from './api-action.model'
import { CodeAction } from './code-action.model'

const createActionFactory = (action: IActionDTO) => {
  switch (action.__typename) {
    case IActionKind.CodeAction:
      return CodeAction.hydrate(action)

    case IActionKind.ApiAction:
      return ApiAction.hydrate(action)

    default:
      throw new Error(`unknown action kind: ${action.name}`)
  }
}

// used for linting
const writeActionCacheFactory = (
  action: IActionDTO,
  actionModel: ICodeAction | IApiAction,
) => {
  if (
    action.__typename === IActionKind.CodeAction &&
    actionModel.type === IActionKind.CodeAction
  ) {
    return actionModel.writeCache(action)
  }

  if (
    action.__typename === IActionKind.ApiAction &&
    actionModel.type === IActionKind.ApiAction
  ) {
    return actionModel.writeCache(action)
  }

  throw new Error(`unknown action kind: ${action.name}`)
}

/**
 * We don't create an Action model because in our Neo4j domain, our base action is an interface
 */
export class Action {
  static create = createActionFactory

  static writeCache = writeActionCacheFactory
}
