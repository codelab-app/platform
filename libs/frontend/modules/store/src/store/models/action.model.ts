import {
  IActionDTO,
  IActionKind,
  ICustomAction,
  IPipelineAction,
  IResourceAction,
} from '@codelab/shared/abstract/core'
import { CustomAction } from './custom-action.model'
import { PipelineAction } from './pipeline-action.model'
import { ResourceAction } from './resource-action.model'

const createActionFactory = (action: IActionDTO) => {
  switch (action.__typename) {
    case IActionKind.CustomAction:
      return CustomAction.hydrate(action)

    case IActionKind.PipelineAction:
      return PipelineAction.hydrate(action)

    case IActionKind.ResourceAction:
      return ResourceAction.hydrate(action)

    default:
      throw new Error(`unknown action kind: ${action.name}`)
  }
}

const writeActionCacheFactory = (
  action: IActionDTO,
  actionModel: ICustomAction | IPipelineAction | IResourceAction,
) => {
  if (
    action.__typename === IActionKind.CustomAction &&
    // used for linting
    actionModel.type === IActionKind.CustomAction
  ) {
    return actionModel.writeCache(action)
  }

  if (
    action.__typename === IActionKind.ResourceAction &&
    actionModel.type === IActionKind.ResourceAction
  ) {
    return actionModel.writeCache(action)
  }

  if (
    action.__typename === IActionKind.PipelineAction &&
    actionModel.type === IActionKind.PipelineAction
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
