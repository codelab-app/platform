import type {
  IApp,
  IAppDto,
  IDomain,
  IPage,
  IRef,
} from '@codelab/shared/abstract/core'

import { IModel } from '@codelab/backend/abstract/types'
import { Domain } from '@codelab/backend/domain/domain'
import { Page } from '@codelab/backend/domain/page'
import { slugify } from '@codelab/shared/utils'
import { Expose } from 'class-transformer'

export class App extends IModel implements IAppDto {
  @Expose()
  get slug() {
    return slugify(this.name)
  }

  domains: Array<IRef>

  id: string

  name: string

  owner: IRef

  pages: Array<IRef>

  constructor({ domains = [], id, name, owner, pages = [] }: IAppDto) {
    super()

    this.id = id
    this.name = name
    this.domains = domains
    this.pages = pages
    this.owner = owner
  }
}
