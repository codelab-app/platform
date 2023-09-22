import type { IApp, IAppDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import { Expose } from 'class-transformer'

export class App implements IApp {
  @Expose()
  get slug() {
    return slugify(this.name)
  }

  domains?: Array<IEntity> | undefined

  id: string

  name: string

  owner: IEntity

  pages?: Array<IEntity> | undefined

  constructor({ domains, id, name, owner, pages }: IAppDTO) {
    this.id = id
    this.name = name
    this.domains = domains
    this.pages = pages
    this.owner = owner
  }
}
