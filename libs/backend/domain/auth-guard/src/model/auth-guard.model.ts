import { IModel } from '@codelab/backend/abstract/types'
import { Prop } from '@codelab/backend/domain/prop'
import type {
  IAuthGuard,
  IAuthGuardDTO,
  IProp,
  IRef,
} from '@codelab/shared/abstract/core'

export class AuthGuard extends IModel implements IAuthGuard {
  config: IProp

  id: string

  name: string

  resource: IRef

  responseTransformer: string

  constructor({
    config,
    id,
    name,
    resource,
    responseTransformer,
  }: IAuthGuardDTO) {
    super()

    this.config = new Prop(config)
    this.id = id
    this.name = name
    this.resource = resource
    this.responseTransformer = responseTransformer
  }
}
