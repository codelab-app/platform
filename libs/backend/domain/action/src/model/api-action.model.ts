import type {
  IActionEntity,
  IApiActionDTO,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class ApiAction implements IApiActionDTO {
  __typename: `${IActionKind.ApiAction}` = `${IActionKind.ApiAction}`

  id: string

  name: string

  store: IEntity

  config: IEntity

  resource: IEntity

  errorAction?: IActionEntity

  successAction?: IActionEntity

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
