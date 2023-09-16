import type { IAppDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class App implements IAppDTO {
  domains?: Array<IEntity> | undefined

  id: string

  compositeKey: string

  pages?: Array<IEntity> | undefined

  owner: IEntity

  constructor({ compositeKey, domains, id, owner, pages }: IAppDTO) {
    this.id = id
    this.compositeKey = compositeKey
    this.domains = domains
    this.pages = pages
    this.owner = owner
  }
}
