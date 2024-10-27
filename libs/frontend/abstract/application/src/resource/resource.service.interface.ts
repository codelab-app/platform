import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type { IPopover, SelectOption } from '@codelab/frontend/abstract/types'
import type {
  ICreateResourceData,
  IResourceDto,
  IResourceType,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import type { ResourceOptions, ResourceWhere } from '@codelab/shared/infra/gql'

import type { ICRUDService, IQueryService } from '../services'

export interface CreateResourceData {
  type?: IResourceType
}

export interface CreateResourceProperties {
  type?: IResourceType
}

export interface IResourceService
  extends ICRUDService<
      IResourceModel,
      ICreateResourceData,
      IUpdateResourceData
    >,
    IQueryService<IResourceModel, ResourceWhere, ResourceOptions> {
  createPopover: IPopover
  updatePopover: IPopover
  getSelectResourceOptions(): Promise<Array<SelectOption>>
  load(resources: Array<IResourceDto>): void
}
