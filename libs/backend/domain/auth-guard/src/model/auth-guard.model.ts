import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class AuthGuard implements IAuthGuardDTO {
  config: IEntity

  id: string

  name: string

  resource: IEntity

  responseTransformer: string

  constructor({
    config,
    id,
    name,
    resource,
    responseTransformer,
  }: IAuthGuardDTO) {
    this.id = id
    this.config = config
    this.name = name
    this.resource = resource
    this.responseTransformer = responseTransformer
  }
}
