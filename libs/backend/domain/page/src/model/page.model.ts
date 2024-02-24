import { IModel } from '@codelab/backend/abstract/types'
import type { PageKind } from '@codelab/shared/abstract/codegen'
import type { IPage, IPageDto, IRef } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { slugify } from 'voca'

export class Page extends IModel implements IPage {
  get slug() {
    return slugify(this.name)
  }

  app: IRef

  id: string

  kind: PageKind

  name: string

  pageContentContainer?: Nullish<IRef>

  rootElement: IRef

  store: IRef

  url: string

  constructor({
    app,
    id,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    url,
  }: IPageDto) {
    super()

    this.id = id
    this.app = app
    this.kind = kind
    this.name = name
    this.pageContentContainer = pageContentContainer
    this.rootElement = rootElement
    this.store = store
    this.url = url
  }
}
