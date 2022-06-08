import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ActionFragment } from './action.fragment.graphql.gen'
import { IActionKind } from './action-kind.enum'
import { IGraphQLActionConfig } from './graphql-action-config.interface'
import { IRestActionConfig } from './rest-action-config.interface'

export interface ICreateActionDTO {
  storeId: string
  name: string
  type: IActionKind
  body: Nullable<string>
  runOnInit: boolean

  // custom action
  code?: string

  // resource action
  resourceId?: Nullish<string>
  config?: Nullish<IRestActionConfig | IGraphQLActionConfig>

  // pipeline action
  actionIds?: Array<string>
}

export type IUpdateActionDTO = ICreateActionDTO

export type IActionDTO = ActionFragment
