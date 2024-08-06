import {
  type IAppModel,
  type IDomainStore,
  type IInterfaceTypeModel,
  type IPageFactory,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { Store } from '@codelab/frontend-domain-store/store'
import { InterfaceType } from '@codelab/frontend-domain-type/store'
import type {
  ICreatePageData,
  IElementRenderTypeDto,
} from '@codelab/shared/abstract/core'
import {
  IPageKind,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'

export const pageFactory = (
  domainStore: Pick<
    IDomainStore,
    | 'elementDomainService'
    | 'pageDomainService'
    | 'storeDomainService'
    | 'typeDomainService'
    | 'userDomainService'
  >,
): IPageFactory => {
  const {
    elementDomainService,
    pageDomainService,
    storeDomainService,
    typeDomainService,
    userDomainService,
  } = domainStore

  const addSystemPages = (
    app: IAppModel,
    renderType: IElementRenderTypeDto,
  ) => {
    return [
      addProviderPage(app, renderType),
      addNotFoundPage(app, renderType),
      addInternalServerErrorPage(app, renderType),
    ]
  }

  const addDefaultPage = (
    app: IAppModel,
    { id, kind, name, urlPattern }: ICreatePageData,
    renderType: IElementRenderTypeDto,
  ) => {
    const { user } = userDomainService
    const userName = user.username

    const pageStoreApi = typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${app.name}(${userName}) ${name} Store`),
    })

    const pageStore = storeDomainService.hydrate({
      api: typeRef<IInterfaceTypeModel>(pageStoreApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const pageRootElement = elementDomainService.hydrate({
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
      kind === IPageKind.Provider ? { id: pageRootElement.id } : null

    return pageDomainService.hydrate({
      app,
      id,
      kind,
      name,
      pageContentContainer,
      rootElement: pageRootElement,
      store: pageStore,
      urlPattern,
    })
  }

  const addInternalServerErrorPage = (
    app: IAppModel,
    renderType: IElementRenderTypeDto,
  ) => {
    return addDefaultPage(
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

  const addNotFoundPage = (
    app: IAppModel,
    renderType: IElementRenderTypeDto,
  ) => {
    return addDefaultPage(
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

  const addProviderPage = (
    app: IAppModel,
    renderType: IElementRenderTypeDto,
  ) => {
    return addDefaultPage(
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

  return {
    addSystemPages,
  }
}
