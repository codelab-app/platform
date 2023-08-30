import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { providerElementData } from './element.data'

export const providerPageData = (
  id: string,
  app: IEntity,
  store: IEntity,
  rootElement: IEntity,
): IPageDTO => ({
  app,
  id,
  kind: IPageKind.Provider,
  name: IPageKindName.Provider,
  pageContentContainer: {
    id: providerElementData.id,
  },
  rootElement,
  store,
  url: IPageKindName.Provider,
})

export const notFoundPageData = (
  id: string,
  app: IEntity,
  store: IEntity,
  rootElement: IEntity,
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
  app: IEntity,
  store: IEntity,
  rootElement: IEntity,
): IPageDTO => ({
  app,
  id,
  kind: IPageKind.InternalServerError,
  name: IPageKindName.InternalServerError,
  rootElement,
  store,
  url: IPageKindName.InternalServerError,
})
