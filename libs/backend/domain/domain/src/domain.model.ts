import { IModel } from '@codelab/backend/abstract/types'
import type { IDomain, IDomainDto, IRef } from '@codelab/shared/abstract/core'

export class Domain extends IModel implements IDomain {
  id: string

  app: IRef

  domainConfig: { misconfigured: boolean } | undefined

  name: string

  projectDomain: { verified: boolean } | undefined

  constructor({ app, domainConfig, id, name, projectDomain }: IDomainDto) {
    super()

    this.id = id
    this.domainConfig = domainConfig
    this.app = app
    this.name = name
    this.projectDomain = projectDomain
  }
}
