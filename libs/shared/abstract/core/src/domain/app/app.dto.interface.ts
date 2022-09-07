import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IDomainExport } from '../domain'
import { IElementTree } from '../element'
import { IPage, IPageExport } from '../page'
import { IStore, IStoreExport } from '../store'
import {
  AppPreviewFragment,
  PageBuilderAppFragment,
} from './app.fragment.graphql.gen'
import { IApp } from './app.model.interface'

export interface ICreateAppDTO {
  id?: string
  name: string
  slug: string
  auth0Id: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'auth0Id' | 'id'>

export type IAppDTO = AppPreviewFragment

/**
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  app: PageBuilderAppFragment
  pageId: string
}

export type IAppExport = Pick<
  OGM_TYPES.App,
  'id' | 'name' | 'rootElement' | 'slug'
> & {
  pages: Array<IPageExport>
  store: IStoreExport
  providerElements: Array<OGM_TYPES.Element>
  domains: Array<IDomainExport>
}

export interface IBuilderApp {
  pageElementTree: IElementTree
  app: IApp
  page: IPage
  store: IStore
}
