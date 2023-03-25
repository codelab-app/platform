import type { IPageDTO } from '@codelab/frontend/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'
import {
  internalServerErrorElementData,
  notFoundElementData,
  providerElementData,
} from './element.data'

export const providerPageData = (app: IEntity): IPageDTO => ({
  app,
  id: v4(),
  kind: IPageKind.Provider,
  name: IPageKindName.Provider,
  rootElement: providerElementData,
})

export const notFoundPageData = (app: IEntity): IPageDTO => ({
  app,
  id: v4(),
  kind: IPageKind.NotFound,
  name: IPageKindName.NotFound,
  rootElement: notFoundElementData,
})

export const internalServerErrorPageData = (app: IEntity): IPageDTO => ({
  app,
  id: v4(),
  kind: IPageKind.InternalServerError,
  name: IPageKindName.InternalServerError,
  rootElement: internalServerErrorElementData,
})
