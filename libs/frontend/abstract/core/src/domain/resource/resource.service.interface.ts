import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
  IQueryService,
} from '../../service'
import {
  ICreateResourceDTO,
  IResourceDTO,
  IUpdateResourceDTO,
} from './resource.dto.interface'
import { IResource, IResourceRef } from './resource.model.interface'

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
  createModal: IEntityModalService<CreateResourceData, { type?: IResourceType }>
  resource(resource: IResourceRef): Maybe<IResource>
  resourceList: Array<IResource>
  deleteResource(id: string): Promise<{ nodesDeleted: number }>
}
