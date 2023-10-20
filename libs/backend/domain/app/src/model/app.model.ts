import { IModel } from '@codelab/backend/abstract/types'
import { Domain } from '@codelab/backend/domain/domain'
import { Page } from '@codelab/backend/domain/page'
import type {
  IApp,
  IAppDTO,
  IDomain,
  IPage,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { slugify } from '@codelab/shared/utils'
import { Expose } from 'class-transformer'

export class App extends IModel implements IApp {
  @Expose()
  get slug() {
    return slugify(this.name)
  }

  domains: Array<IDomain>

  id: string

  name: string

  owner: IEntity

  pages: Array<IPage>

  constructor({ domains = [], id, name, owner, pages = [] }: IAppDTO) {
    super()

    this.id = id
    this.name = name
    this.domains = domains.map((domain) => new Domain(domain))
    this.pages = pages.map((page) => new Page(page))
    this.owner = owner
  }
}
