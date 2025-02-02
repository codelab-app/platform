import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type { IPopover, SelectOption } from '@codelab/frontend/abstract/types'
import type {
  ICreateResourceData,
  IRef,
  IResourceDto,
  IResourceType,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/infra/gqlgen'

import type { ICrudService, IQueryService } from '../services'

export interface CreateResourceData {
  type?: IResourceType
}

export interface CreateResourceProperties {
  type?: IResourceType
}

export interface IResourceService
  extends ICrudService<IRef, ICreateResourceData, IUpdateResourceData>,
    IQueryService<IResourceModel, ResourceWhere, ResourceOptions> {
  createPopover: IPopover
  updatePopover: IPopover
  getSelectResourceOptions(): Promise<Array<SelectOption>>
  load(resources: Array<IResourceDto>): void
}
