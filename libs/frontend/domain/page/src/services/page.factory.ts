import type {
  IInterfaceType,
  IPageFactory,
} from '@codelab/frontend/abstract/domain'
import {
  getElementService,
  getUserService,
  ICreatePageData,
  IPageAppFragment,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import type { IPropDTO } from '@codelab/shared/abstract/core'
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
import { getPageService } from '../store'

@model('@codelab/PageFactory')
export class PageFactory extends Model({}) implements IPageFactory {
  /**
   *
   * @param app
   * @returns
   */
  @modelAction
  addSystemPages(app: IPageAppFragment, renderType: IElementRenderTypeDto) {
    return [
      this.addProviderPage(app, renderType),
      this.addNotFoundPage(app, renderType),
      this.addInternalServerErrorPage(app, renderType),
    ]
  }

  @modelAction
  private addDefaultPage(
    { app, id, kind, name, url }: ICreatePageData,
    appName: string,
    renderType: IElementRenderTypeDto,
  ) {
    const rootElementProps: IPropDTO = {
      data: '{}',
      id: v4(),
    }

    this.propService.add(rootElementProps)

    const { user } = this.userService
    const userName = user.username

    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${appName}(${userName}) ${name} Store`),
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const rootElement = this.elementService.add({
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id },
      props: rootElementProps,
      renderType,
    })

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: rootElement.id } : null

    return this.pageService.add({
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
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.InternalServerError,
        name: IPageKindName.InternalServerError,
        url: `/${IPageKindName.InternalServerError}`,
      },
      app.name,
      renderType,
    )
  }

  @modelAction
  private addNotFoundPage(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.NotFound,
        name: IPageKindName.NotFound,
        url: `/${IPageKindName.NotFound}`,
      },
      app.name,
      renderType,
    )
  }

  @modelAction
  private addProviderPage(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ) {
    return this.addDefaultPage(
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        url: `/${IPageKindName.Provider}`,
      },
      app.name,
      renderType,
    )
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
