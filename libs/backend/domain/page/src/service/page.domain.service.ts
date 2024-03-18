import { ElementDomainService } from '@codelab/backend/domain/element'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Store, StoreDomainService } from '@codelab/backend/domain/store'
import { InterfaceType, TypeDomainService } from '@codelab/backend/domain/type'
import type {
  IAppDto,
  ICreatePageData,
  IUserDto,
} from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { PageRepository } from '../repository'

type ICreatePageAppDto = Pick<IAppDto, 'id' | 'name'>

type ICreatePageUserDto = Pick<IUserDto, 'username'>

@Injectable()
export class PageDomainService {
  constructor(
    private pageRepository: PageRepository,
    private typeDomainService: TypeDomainService,
    private storeDomainService: StoreDomainService,
    private elementDomainService: ElementDomainService,
    private authService: AuthDomainService,
  ) {}

  async createPage(
    page: ICreatePageData,
    user: ICreatePageUserDto,
    app: ICreatePageAppDto,
  ) {
    await this.addProviderPage(app)
    await this.addNotFoundPage(app)
    await this.addInternalServerErrorPage(app)

    await this.addDefaultPage(page, app)
  }

  async createSystemPages(app: ICreatePageAppDto) {
    await this.addProviderPage(app)
    await this.addNotFoundPage(app)
    await this.addInternalServerErrorPage(app)
  }

  private async addDefaultPage(
    { id, kind, name, url }: ICreatePageData,
    app: ICreatePageAppDto,
  ) {
    const user = this.authService.currentUser

    const pageStoreApi = await this.typeDomainService.createInterface({
      id: v4(),
      name: InterfaceType.createName(
        `${app.name}(${user.username}) ${name} Store`,
      ),
    })

    const pageStore = await this.storeDomainService.create({
      api: pageStoreApi,
      id: v4(),
      name: Store.createName({ name }),
    })

    const pageRootElement = await this.elementDomainService.createRootElement({
      closestContainerNode: {
        id,
      },
      id: v4(),
      page: { id },
    })

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: pageRootElement.id } : null

    await this.pageRepository.add({
      app,
      id,
      kind,
      name,
      pageContentContainer,
      rootElement: pageRootElement,
      store: pageStore,
      url,
    })
  }

  private addInternalServerErrorPage(app: ICreatePageAppDto) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        url: `/${IPageKindName.Provider}`,
      },
      app,
    )
  }

  private addNotFoundPage(app: ICreatePageAppDto) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.NotFound,
        name: IPageKindName.NotFound,
        url: `/${IPageKindName.NotFound}`,
      },
      app,
    )
  }

  private async addProviderPage(app: ICreatePageAppDto) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        url: `/${IPageKindName.Provider}`,
      },
      app,
    )
  }
}
