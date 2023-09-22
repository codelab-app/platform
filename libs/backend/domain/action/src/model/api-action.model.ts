import type {
  IActionEntity,
  IApiActionDTO,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class ApiAction implements IApiActionDTO {
  __typename: `${IActionKind.ApiAction}` = `${IActionKind.ApiAction}`

  config: IEntity

  errorAction?: IActionEntity | null

  id: string

  name: string

  resource: IEntity

  store: IEntity

  successAction?: IActionEntity | null

  constructor({
    config,
    errorAction,
    id,
    name,
    resource,
    store,
    successAction,
  }: IApiActionDTO) {
    this.id = id
    this.name = name
    this.resource = resource
    this.config = config
    this.store = store
    this.errorAction = errorAction
    this.successAction = successAction
  }
}
