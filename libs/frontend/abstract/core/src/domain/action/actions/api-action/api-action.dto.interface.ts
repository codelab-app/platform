import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type { IPropDTO } from '../../../prop'
import type { IBaseActionDTO } from '../../action.dto.interface'

export interface IApiActionDTO extends IBaseActionDTO {
  // Used as discriminator
  __typename: `${IActionKind.ApiAction}`
  successAction?: Nullable<IBaseActionDTO>
  errorAction?: Nullable<IBaseActionDTO>
  resource: IEntity
  config: IPropDTO
}
