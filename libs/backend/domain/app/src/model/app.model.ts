import type { IAppDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class App implements IAppDTO {
  domains?: Array<IEntity> | undefined

  id: string

  name: string

  pages?: Array<IEntity> | undefined

  constructor({ domains, id, name, pages }: IAppDTO) {
    this.id = id
    this.name = name
    this.domains = domains
    this.pages = pages
  }
}
