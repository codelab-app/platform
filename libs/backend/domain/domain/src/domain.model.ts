import { IModel } from '@codelab/backend/abstract/types'
import type { IDomain, IDomainDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class Domain extends IModel implements IDomain {
  id: string

  app: IEntity

  domainConfig: { misconfigured: boolean } | undefined

  name: string

  projectDomain: { verified: boolean } | undefined

  constructor({ app, domainConfig, id, name, projectDomain }: IDomainDTO) {
    super()

    this.id = id
    this.domainConfig = domainConfig
    this.app = app
    this.name = name
    this.projectDomain = projectDomain
  }
}
