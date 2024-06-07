import type { IPageDto, IRef } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'

export const providerPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDto => ({
  app,
  id,
  kind: IPageKind.Provider,
  name: IPageKindName.Provider,
  pageContentContainer: {
    id: rootElement.id,
  },
  rootElement,
  store,
  urlPattern: IPageKindName.Provider,
})

export const notFoundPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDto => ({
  app,
  id,
  kind: IPageKind.NotFound,
  name: IPageKindName.NotFound,
  rootElement,
  store,
  urlPattern: IPageKindName.NotFound,
})

export const internalServerErrorPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDto => ({
  app,
  id,
  kind: IPageKind.InternalServerError,
  name: IPageKindName.InternalServerError,
  rootElement,
  store,
  urlPattern: IPageKindName.InternalServerError,
})
