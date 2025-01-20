import type {
  IAuthGuard,
  IAuthGuardDto,
  IProp,
  IRef,
} from '@codelab/shared/abstract/core'

import { IModel } from '@codelab/shared/abstract/core'
import { Prop } from '@codelab/backend/domain/prop'

export class AuthGuard extends IModel implements IAuthGuard {
  config: IProp

  id: string

  name: string

  owner: IRef

  resource: IRef

  responseTransformer: string

  constructor({
    config,
    id,
    name,
    owner,
    resource,
    responseTransformer,
  }: IAuthGuardDto) {
    super()

    this.config = new Prop(config)
    this.id = id
    this.name = name
    this.resource = resource
    this.responseTransformer = responseTransformer
    this.owner = owner
  }
}
