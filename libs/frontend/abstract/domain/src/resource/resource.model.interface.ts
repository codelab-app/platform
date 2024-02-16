import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IResource,
  IResourceClient,
  IResourceDto,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type { IPropModel } from '../prop'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

export interface IResourceModel
  extends Omit<
      IModel<ResourceCreateInput, ResourceUpdateInput, void, IResource>,
      'toDeleteInput'
    >,
    ICacheService<IResourceDto, IResourceModel> {
  client: IResourceClient
  config: IPropModel
  name: string
  type: IResourceType
}
