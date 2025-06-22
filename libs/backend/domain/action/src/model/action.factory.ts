import type { IActionDto } from '@codelab/shared-abstract-core'

import { IActionKind } from '@codelab/shared-abstract-core'

import { ApiAction } from './api-action.model'
import { CodeAction } from './code-action.model'

export class ActionModelFactory {
  static create(action: IActionDto) {
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
