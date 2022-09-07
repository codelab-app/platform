import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import {
  ICreateResourceDTO,
  IResourceDTO,
  IUpdateResourceDTO,
} from './resource.dto.interface'
import { IResource, IResourceRef } from './resource.model.interface'
import { IResourceType } from './resource-type.enum'

export interface CreateResourceData {
  type?: IResourceType
}

export interface CreateResourceProperties {
  type?: IResourceType
}
export interface IResourceService
  extends Pick<
      ICRUDService<IResource, ICreateResourceDTO, IUpdateResourceDTO>,
      'create' | 'update'
    >,
    IQueryService<IResource, ResourceWhere>,
    ICacheService<IResourceDTO, IResource>,
    Omit<
      ICRUDModalService<Ref<IResource>, { resource: Maybe<IResource> }>,
      'createModal'
    > {
  createModal: IModalService<CreateResourceData, { type?: IResourceType }>
  resource(resource: IResourceRef): Maybe<IResource>
  resourceList: Array<IResource>
  deleteResource(id: string): Promise<{ nodesDeleted: number }>
}
