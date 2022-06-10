import { IActionDTO, IActionKind } from '@codelab/shared/abstract/core'
import { CustomAction, PipelineAction, ResourceAction } from './models'

export const actionFactory = (action: IActionDTO) => {
  switch (action.__typename) {
    case IActionKind.CustomAction:
      return CustomAction.hydrate(action)

    case IActionKind.PipelineAction:
      return PipelineAction.hydrate(action)

    case IActionKind.ResourceAction:
      return ResourceAction.hydrate(action)

    default:
      throw new Error(`Unknown action kind: ${action.name}`)
  }
}
