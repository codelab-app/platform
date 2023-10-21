import type {
  ICreateResourceData,
  IResourceModel,
  IUpdateResourceData,
} from '@codelab/frontend/abstract/domain'
import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../services'

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
    IQueryService<IResourceModel, ResourceWhere, ResourceOptions>,
    Omit<
      ICRUDModalService<IResourceModel, { resource?: IResourceModel }>,
      'createModal'
    >,
    ICRUDFormService<IResourceModel, { resource?: IResourceModel }> {
  createModal: IModalService<CreateResourceData, { type?: IResourceType }>
  resourceList: Array<IResourceModel>

  add(resource: IResourceDTO): IResourceModel
  getSelectResourceOptions(): Promise<Array<DefaultOptionType>>
  load(resources: Array<IResourceDTO>): void
  resource(id: string): Maybe<IResourceModel>
}
