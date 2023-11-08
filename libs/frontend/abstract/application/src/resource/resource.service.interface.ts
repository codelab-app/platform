import type {
  ICreateResourceData,
  IResourceDomainService,
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
import type { ObjectMap, Ref } from 'mobx-keystone'
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
      ICRUDModalService<Ref<IResourceModel>, { resource?: IResourceModel }>,
      'createModal'
    >,
    ICRUDFormService<Ref<IResourceModel>, { resource?: IResourceModel }> {
  createModal: IModalService<CreateResourceData, { type?: IResourceType }>
  resourceDomainService: IResourceDomainService
  resourceList: Array<IResourceModel>

  getSelectResourceOptions(): Promise<Array<DefaultOptionType>>
  load(resources: Array<IResourceDTO>): void
  resource(id: string): Maybe<IResourceModel>
}
