import {
  type IAppDto,
  type IElementDto,
  IModel,
  type IPageDto,
  IPageKind,
  type IRef,
} from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { Page } from '@codelab/shared-domain-module/page'
import { Expose } from 'class-transformer'
import { v4 } from 'uuid'

const seedApp = () => {
  const appDto: IAppDto = {
    id: v4(),
    name: 'Codelab App',
    owner: { id: v4() },
    pages: [],
  }

  const pageId = v4()

  const rootElement: IElementDto = {
    closestContainerNode: { id: pageId },
    id: v4(),
    name: 'Root Element',
    props: { data: '{}', id: v4() },
    renderType: { __typename: 'Component', id: v4() },
  }

  const pageDto: IPageDto = {
    app: { id: appDto.id },
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Home',
    rootElement: { id: rootElement.id },
    store: { id: v4() },
    urlPattern: '/home',
  }

  const app = new App(appDto)
  const page = app.addPage(pageDto)

  return app
}

export class App extends IModel implements IAppDto {
  static seedApp = seedApp

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

  addPage(pageDto: IPageDto) {
    const pageModel = new Page(pageDto)

    this.pages.push(pageModel)
  }
}
