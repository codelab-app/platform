import type { IPageDTO } from '@codelab/frontend/abstract/core'
import type { PageKind } from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'

export class Page implements IPageDTO {
  app: IEntity

  // descendentElements?: Array<IEntity> | undefined

  id: string

  kind: PageKind

  name: string

  pageContentContainer?: Nullish<IEntity>

  rootElement: IEntity

  store: IEntity

  url: string

  constructor({
    app,
    // descendentElements,
    id,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    url,
  }: IPageDTO) {
    this.id = id
    this.app = app
    // this.descendentElements = descendentElements
    this.kind = kind
    this.name = name
    this.pageContentContainer = pageContentContainer
    this.rootElement = rootElement
    this.store = store
    this.url = url
  }
}
