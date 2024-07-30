import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  ICreateResourceData,
  IResourceDto,
  IResourceType,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
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
  resourceList: Array<IResourceModel>

  getResource(id: string): Maybe<IResourceModel>
  getSelectResourceOptions(): Promise<Array<DefaultOptionType>>
  load(resources: Array<IResourceDto>): void
}
