import {
  getElementService,
  getUserService,
} from '@codelab/frontend/abstract/application'
import type {
  IInterfaceTypeModel,
  IPageFactory,
} from '@codelab/frontend/abstract/domain'
import {
  IAppModel,
  ICreatePageData,
  IPageAppFragment,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getStoreDomainService, Store } from '@codelab/frontend/domain/store'
import {
  getTypeDomainService,
  InterfaceType,
} from '@codelab/frontend/domain/type'
import {
  IElementRenderTypeDto,
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { computed } from 'mobx'
import { Model, model, modelAction } from 'mobx-keystone'
import { v4 } from 'uuid'

@model('@codelab/PageFactory')
export class PageDomainFactory extends Model({}) implements IPageFactory {
  @modelAction
  addSystemPages(app: IAppModel, renderType: IElementRenderTypeDto) {
    return [
      this.addProviderPage(app, renderType),
      this.addNotFoundPage(app, renderType),
      this.addInternalServerErrorPage(app, renderType),
    ]
  }

  @modelAction
  private addDefaultPage(
    app: IAppModel,
    { id, kind, name, url }: ICreatePageData,
    renderType: IElementRenderTypeDto,
  ) {
    const { user } = this.userService
    const userName = user.username

    const interfaceType = this.typeDomainService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${app.name}(${userName}) ${name} Store`),
    })

    const store = this.storeDomainService.add({
      api: typeRef<IInterfaceTypeModel>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const rootElement = this.elementService.elementDomainService.hydrate({
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id },
      props: {
        data: '{}',
        id: v4(),
      },
      renderType,
    })

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: rootElement.id } : null

    return app.addPageInCache({
      app,
      id,
      kind,
      name,
      pageContentContainer,
      rootElement,
      store,
      url,
    })
  }

  @modelAction
  private addInternalServerErrorPage(
    app: IAppModel,
    renderType: IElementRenderTypeDto,
  ) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.InternalServerError,
        name: IPageKindName.InternalServerError,
        url: `/${IPageKindName.InternalServerError}`,
      },
      renderType,
    )
  }

  @modelAction
  private addNotFoundPage(app: IAppModel, renderType: IElementRenderTypeDto) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.NotFound,
        name: IPageKindName.NotFound,
        url: `/${IPageKindName.NotFound}`,
      },
      renderType,
    )
  }

  @modelAction
  private addProviderPage(app: IAppModel, renderType: IElementRenderTypeDto) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        url: `/${IPageKindName.Provider}`,
      },
      renderType,
    )
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
