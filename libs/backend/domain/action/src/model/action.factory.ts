import type { IActionDTO } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { ApiAction } from './api-action.model'
import { CodeAction } from './code-action.model'

export class ActionFactory {
  static create(action: IActionDTO) {
    switch (action.__typename) {
      case IActionKind.ApiAction: {
        return new ApiAction(action)
      }

      case IActionKind.CodeAction: {
        return new CodeAction(action)
      }

      default: {
        throw new Error('No ActionFactory found')
      }
    }
  }
}