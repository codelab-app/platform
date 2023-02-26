import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IResourceDTO } from '../../../resource'
import type { IInterfaceTypeDTO } from '../../../type'
import type {
  IApiActionConfig,
  IBaseActionDTO,
} from '../../action.dto.interface'
import type { ApiActionFragment } from '../../fragments'

export interface IApiActionDTO extends IBaseActionDTO {
  // Used as discriminator
  __typename: `${IActionKind.ApiAction}`
  successAction?: IBaseActionDTO
  errorAction?: IBaseActionDTO
  resource: IResourceDTO
  config: {
    id: string
    data: IApiActionConfig
    api?: IInterfaceTypeDTO
  }
}
