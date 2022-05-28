import { Ref } from 'mobx-keystone'
import { IProp } from '../prop'
import { IResource } from '../resource'
import { IGraphQLActionConfig } from './graphql-action-config.interface'
import { IRestActionConfig } from './rest-action-config.interface'

export type IActionConfig = IProp<IRestActionConfig | IGraphQLActionConfig>

export interface IAction {
  id: string
  name: string
  body: string
  config: IActionConfig
  resource: Ref<IResource>
  runOnInit: boolean
}
