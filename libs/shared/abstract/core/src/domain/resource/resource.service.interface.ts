import { ResourceWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import {
  ICreateResourceDTO,
  IUpdateResourceDTO,
} from './resource.dto.interface'
import { IResource, IResourceRef } from './resource.model.interface'

export interface IResourceService
  extends Pick<
      ICRUDService<IResource, ICreateResourceDTO, IUpdateResourceDTO>,
      'create' | 'update'
    >,
    IQueryService<IResource, ResourceWhere>,
    ICRUDModalService<Ref<IResource>, { resource: Maybe<IResource> }> {
  resource(resource: IResourceRef): Maybe<IResource>
  resourceList: Array<IResource>
}
