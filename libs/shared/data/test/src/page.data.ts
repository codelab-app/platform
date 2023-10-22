import type { IPageDTO, IRef } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'

export const providerPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDTO => ({
  app,
  id,
  kind: IPageKind.Provider,
  name: IPageKindName.Provider,
  pageContentContainer: {
    id: rootElement.id,
  },
  rootElement,
  store,
  url: IPageKindName.Provider,
})

export const notFoundPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDTO => ({
  app,
  id,
  kind: IPageKind.NotFound,
  name: IPageKindName.NotFound,
  rootElement,
  store,
  url: IPageKindName.NotFound,
})

export const internalServerErrorPageData = (
  id: string,
  app: IRef,
  store: IRef,
  rootElement: IRef,
): IPageDTO => ({
  app,
  id,
  kind: IPageKind.InternalServerError,
  name: IPageKindName.InternalServerError,
  rootElement,
  store,
  url: IPageKindName.InternalServerError,
})
