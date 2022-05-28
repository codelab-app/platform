import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ActionFragment } from './action.fragment.graphql.gen'
import { IGraphQLActionConfig } from './graphql-action-config.interface'
import { IRestActionConfig } from './rest-action-config.interface'

export interface ICreateActionDTO {
  storeId: string
  name: string
  body: Nullable<string>

  runOnInit: boolean
  resourceId: Nullish<string>
  config: Nullish<IRestActionConfig | IGraphQLActionConfig>
}

export type IUpdateActionDTO = ICreateActionDTO

export type IActionDTO = ActionFragment
