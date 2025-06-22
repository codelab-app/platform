import type { IPageDomainFactory } from '@codelab/frontend-abstract-domain'
import type {
  IAppDto,
  IElementDto,
  IElementRenderTypeDto,
  IInterfaceTypeDto,
  IPageCreateFormData,
  IStoreDto,
  IUserDto,
} from '@codelab/shared-abstract-core'

import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import {
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared-config-env'
import { v4 } from 'uuid'

type IAppNode = Pick<IAppDto, 'id' | 'name'>

export class PageDomainFactory implements IPageDomainFactory {
  constructor(private owner: IUserDto) {}

  addSystemPages(app: IAppNode, renderType: IElementRenderTypeDto) {
    return [
      this.addProviderPage(app, renderType),
      this.addNotFoundPage(app, renderType),
      this.addInternalServerErrorPage(app, renderType),
    ]
  }

  private addDefaultPage(
    app: IAppNode,
    { id, kind, name, urlPattern }: IPageCreateFormData,
    renderType: IElementRenderTypeDto,
  ) {
    const owner = this.owner

    const pageStoreApi: IInterfaceTypeDto = {
      __typename: 'InterfaceType',
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(
        `${app.name}(${owner.username}) ${name} Store`,
      ),
      owner: { id: owner.id },
    }

    const pageStore: IStoreDto = {
      api: { id: pageStoreApi.id },
      id: v4(),
      name: Store.createName({ name }),
    }

    const pageRootElement: IElementDto = {
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
    }

    const pageContentContainer =
      kind === IPageKind.Provider ? { id: pageRootElement.id } : null

    return {
      app,
      id,
      kind,
      name,
      pageContentContainer,
      rootElement: pageRootElement,
      store: pageStore,
      storeApi: pageStoreApi,
      urlPattern,
    }
  }

  private addInternalServerErrorPage(
    app: IAppNode,
    renderType: IElementRenderTypeDto,
  ) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.InternalServerError,
        name: IPageKindName.InternalServerError,
        urlPattern: `/${IPageKindName.InternalServerError}`,
      },
      renderType,
    )
  }

  private addNotFoundPage(app: IAppNode, renderType: IElementRenderTypeDto) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.NotFound,
        name: IPageKindName.NotFound,
        urlPattern: `/${IPageKindName.NotFound}`,
      },
      renderType,
    )
  }

  private addProviderPage(app: IAppNode, renderType: IElementRenderTypeDto) {
    return this.addDefaultPage(
      app,
      {
        app,
        id: v4(),
        kind: IPageKind.Provider,
        name: IPageKindName.Provider,
        urlPattern: `/${IPageKindName.Provider}`,
      },
      renderType,
    )
  }
}
