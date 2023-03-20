import type { IAuth0Owner, IPageDTO } from '@codelab/frontend/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { appData } from './app.data'
import {
  internalServerErrorElementData,
  notFoundElementData,
  providerElementData,
} from './element.data'

export const providerPageData = (owner: IAuth0Owner): IPageDTO => ({
  app: appData(owner),
  id: v4(),
  kind: IPageKind.Provider,
  name: IPageKindName.Provider,
  rootElement: providerElementData,
})

export const notFoundPageData = (owner: IAuth0Owner): IPageDTO => ({
  app: appData(owner),
  id: v4(),
  kind: IPageKind.NotFound,
  name: IPageKindName.NotFound,
  rootElement: notFoundElementData,
})

export const internalServerErrorPageData = (owner: IAuth0Owner): IPageDTO => ({
  app: appData(owner),
  id: v4(),
  kind: IPageKind.InternalServerError,
  name: IPageKind.InternalServerError,
  rootElement: internalServerErrorElementData,
})
