import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IBaseActionDTO } from '../../action.dto.interface'

export interface IApiActionDTO extends IBaseActionDTO {
  // Used as discriminator
  __typename: `${IActionKind.ApiAction}`
  config: IEntity
  errorAction?: IEntity
  resource: IEntity
  successAction?: IEntity
}
