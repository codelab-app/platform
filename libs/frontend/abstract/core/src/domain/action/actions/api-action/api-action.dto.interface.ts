import type { IActionKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { IResourceDTO } from '../../../resource'
import type { IInterfaceTypeDTO } from '../../../type'
import type {
  IApiActionConfig,
  IBaseActionDTO,
} from '../../action.dto.interface'

export interface IApiActionDTO extends IBaseActionDTO {
  // Used as discriminator
  __typename: `${IActionKind.ApiAction}`
  successAction?: Nullable<IBaseActionDTO>
  errorAction?: Nullable<IBaseActionDTO>
  resource: IResourceDTO
  config: {
    id: string
    data: IApiActionConfig
    api?: IInterfaceTypeDTO
  }
}
