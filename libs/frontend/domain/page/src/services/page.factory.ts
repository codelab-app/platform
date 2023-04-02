import type {
  IApp,
  IInterfaceType,
  IPageFactory,
} from '@codelab/frontend/abstract/core'
import {
  getElementService,
  IAuth0Owner,
  ISystemPageDTO,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
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

  @modelAction
  addSystemPages(app: Pick<IApp, 'id' | 'owner'>) {
    return [
      this.addProviderPage(app.id, app.owner),
      this.addNotFoundPage(app.id, app.owner),
      this.addInternalServerErrorPage(app.id, app.owner),
    ]
  }

  @modelAction
  private addProviderPage(appId: string, owner: IAuth0Owner) {
    return this.addDefaultPage({
      app: { id: appId },
      kind: IPageKind.Provider,
      name: IPageKindName.Provider,
      owner,
      url: `/${IPageKindName.Provider}`,
    })
  }

  @modelAction
  private addNotFoundPage(appId: string, owner: IAuth0Owner) {
    return this.addDefaultPage({
      app: { id: appId },
      kind: IPageKind.NotFound,
      name: IPageKindName.NotFound,
      owner,
      url: `/${IPageKindName.NotFound}`,
    })
  }

  @modelAction
  private addInternalServerErrorPage(appId: string, owner: IAuth0Owner) {
    return this.addDefaultPage({
      app: { id: appId },
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

    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
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
