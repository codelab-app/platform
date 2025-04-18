import type {
  IProp,
  IRef,
  IResource,
  IResourceDto,
  IResourceType,
} from '@codelab/shared-abstract-core'

import { Prop } from '@codelab/backend-domain-prop'
import { IModel } from '@codelab/shared-abstract-core'

export class Resource extends IModel implements IResource {
  config: IProp

  id: string

  name: string

  owner: IRef

  type: IResourceType

  constructor({ config, id, name, owner, type }: IResourceDto) {
    super()

    this.id = id
    this.config = new Prop(config)
    this.name = name
    this.type = type
    this.owner = owner
  }
}
