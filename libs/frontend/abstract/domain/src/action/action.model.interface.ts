import type { IApiAction, ICodeAction } from '@codelab/shared-abstract-core'
import type {
  ApiActionFragment,
  CodeActionFragment,
} from '@codelab/shared-infra-gqlgen'

import type { IApiActionModel, ICodeActionModel } from './actions'

export type IActionModel = IApiActionModel | ICodeActionModel

export type IAction = IApiAction | ICodeAction

export type IActionFragment = ApiActionFragment | CodeActionFragment
