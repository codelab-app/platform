import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type {
  ICreateResourceData,
  IUpdateResourceData,
} from './resource.dto.interface'
import type { IResourceModel, IResourceRef } from './resource.model.interface'

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
      ICRUDModalService<
        Ref<IResourceModel>,
        { resource: Maybe<IResourceModel> }
      >,
      'createModal'
    >,
    ICRUDFormService<Ref<IResourceModel>, { resource: Maybe<IResourceModel> }> {
  createModal: IEntityModalService<CreateResourceData, { type?: IResourceType }>
  resourceList: Array<IResourceModel>
  resources: ObjectMap<IResourceModel>

  add(resource: IResourceDTO): IResourceModel
  getSelectResourceOptions(): Promise<Array<DefaultOptionType>>
  load(resources: Array<IResourceDTO>): void
  resource(resource: IResourceRef): Maybe<IResourceModel>
}
