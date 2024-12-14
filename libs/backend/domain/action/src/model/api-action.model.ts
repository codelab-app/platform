import type {
  IActionRef,
  IApiActionDto,
  IPropDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { IActionKind } from '@codelab/shared/abstract/core'

export class ApiAction implements IApiActionDto {
  __typename: `${IActionKind.ApiAction}` = `${IActionKind.ApiAction}`

  config: IPropDto

  errorAction?: IActionRef | null

  id: string

  name: string

  resource: IRef

  store: IRef

  successAction?: IActionRef | null

  type: IActionKind.ApiAction = IActionKind.ApiAction

  constructor({
    config,
    errorAction,
    id,
    name,
    resource,
    store,
    successAction,
  }: IApiActionDto) {
    this.id = id
    this.name = name
    this.resource = resource
    this.config = config
    this.store = store
    this.errorAction = errorAction
    this.successAction = successAction
  }
}
