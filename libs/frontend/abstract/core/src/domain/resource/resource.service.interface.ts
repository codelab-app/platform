import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IResourceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import type {
  ICreateResourceData,
  IResourceDTO,
  IUpdateResourceData,
} from './resource.dto.interface'
import type { IResource, IResourceRef } from './resource.model.interface'

export interface CreateResourceData {
  type?: IResourceType
}

export interface CreateResourceProperties {
  type?: IResourceType
}
export interface IResourceService
  extends ICRUDService<IResource, ICreateResourceData, IUpdateResourceData>,
    IQueryService<IResource, ResourceWhere, ResourceOptions>,
    Omit<
      ICRUDModalService<Ref<IResource>, { resource: Maybe<IResource> }>,
      'createModal'
    > {
  createModal: IEntityModalService<CreateResourceData, { type?: IResourceType }>
  resourceList: Array<IResource>

  add(resource: IResourceDTO): IResource
  load(resources: Array<IResourceDTO>): void
  resource(resource: IResourceRef): Maybe<IResource>
}
