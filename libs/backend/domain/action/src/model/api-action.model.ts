import type { Prop } from '@codelab/backend/domain/prop'
import type {
  IActionEntity,
  IApiActionDTO,
  IRef,
} from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'

export class ApiAction implements IApiActionDTO {
  __typename: `${IActionKind.ApiAction}` = `${IActionKind.ApiAction}`

  config: Prop

  errorAction?: IActionEntity | null

  id: string

  name: string

  resource: IRef

  store: IRef

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
