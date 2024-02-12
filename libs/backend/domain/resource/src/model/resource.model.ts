import { IModel } from '@codelab/backend/abstract/types'
import { Prop } from '@codelab/backend/domain/prop'
import type {
  IProp,
  IResource,
  IResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'

export class Resource extends IModel implements IResource {
  id: string

  config: IProp

  name: string

  type: IResourceType

  constructor({ config, id, name, type }: IResourceDTO) {
    super()

    this.id = id
    this.config = new Prop(config)
    this.name = name
    this.type = type
  }
}
