import type { IPageDto, IRef } from '@codelab/shared/abstract/core'

import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'

export const providerPageId = 'b91c9256-da3e-4e16-b113-d0f2a173394b'
export const notFoundPageId = '5bdbfb31-b9da-447b-a508-585aeecb33f2'
export const internalServerPageId = '3c89fc6c-110d-4322-98da-0d949d408cbc'

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
