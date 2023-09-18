import type { IApp, IAppDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import { Expose } from 'class-transformer'

export class App implements IApp {
  domains?: Array<IEntity> | undefined

  id: string

  name: string

  pages?: Array<IEntity> | undefined

  owner: IEntity

  constructor({ domains, id, name, owner, pages }: IAppDTO) {
    this.id = id
    this.name = name
    this.domains = domains
    this.pages = pages
    this.owner = owner
  }

  @Expose()
  get slug() {
    return slugify(this.name)
  }
}
