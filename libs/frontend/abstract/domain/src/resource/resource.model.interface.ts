import type {
  IRef,
  IResourceClient,
  IResourceDto,
  IResourceType,
} from '@codelab/shared-abstract-core'

import type { IPropModel } from '../prop'
import type { IModel } from '../shared/models/model.interface'

export interface IResourceModel extends IModel<IResourceDto, IResourceModel> {
  client: IResourceClient
  config: IPropModel
  id: string
  name: string
  owner: IRef
  type: IResourceType
}

export type IResourceRef = string
