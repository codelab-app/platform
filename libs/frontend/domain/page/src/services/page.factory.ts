import type {
  IInterfaceType,
  IPageFactory,
  ISystemPageDTO,
} from '@codelab/frontend/abstract/core'
import {
  getElementService,
  IAuth0Owner,
  IPageAppFragment,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { getUserService } from '@codelab/frontend/domain/user'
import {
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { Model, model, modelAction } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getPageService } from '../store'

@model('@codelab/PageFactory')
export class PageFactory extends Model({}) implements IPageFactory {
  @computed
  get pageService() {
    return getPageService(this)
  }

  @computed
  get propService() {
    return getPropService(this)
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }

  @modelAction
  addSystemPages(app: IPageAppFragment) {
    return [
      this.addProviderPage(app, app.owner),
      this.addNotFoundPage(app, app.owner),
      this.addInternalServerErrorPage(app, app.owner),
    ]
  }

  @modelAction
  private addProviderPage(app: IPageAppFragment, owner: IAuth0Owner) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.Provider,
      name: IPageKindName.Provider,
      owner,
      url: `/${IPageKindName.Provider}`,
    })
  }

  @modelAction
  private addNotFoundPage(app: IPageAppFragment, owner: IAuth0Owner) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.NotFound,
      name: IPageKindName.NotFound,
      owner,
      url: `/${IPageKindName.NotFound}`,
    })
  }

  @modelAction
  private addInternalServerErrorPage(
    app: IPageAppFragment,
    owner: IAuth0Owner,
  ) {
    return this.addDefaultPage({
      app,
      kind: IPageKind.InternalServerError,
      name: IPageKindName.InternalServerError,
      owner,
      url: `/${IPageKindName.InternalServerError}`,
    })
  }

  @modelAction
  private addDefaultPage({ app, kind, name, owner, url }: ISystemPageDTO) {
    const rootElementProps = this.propService.add({
      id: v4(),
    })

    const pageId = v4()
    const { auth0Id, user } = this.userService
    const userName = user?.username ?? auth0Id

    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${app.name}(${userName}) ${name} Store`),
      owner,
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id: pageId },
      props: rootElementProps,
    })

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: rootElement.id } : null

    return this.pageService.add({
      app,
      id: pageId,
      kind,
      name,
      pageContentContainer,
      rootElement,
      store,
      url,
    })
  }
}
