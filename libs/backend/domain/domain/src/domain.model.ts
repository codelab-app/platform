import { IModel } from '@codelab/backend/abstract/types'
import type { IDomain, IDomainDto, IRef } from '@codelab/shared/abstract/core'

export class Domain extends IModel implements IDomain {
  app: IRef

  domainConfig: { status: string } | undefined

  id: string

  name: string

  constructor({ app, domainConfig, id, name }: IDomainDto) {
    super()

    this.id = id
    this.domainConfig = domainConfig
    this.app = app
    this.name = name
  }
}
