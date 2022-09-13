import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IDomainExport } from '../domain'
import { IPageExport } from '../page'
import { IStoreExport } from '../store'
import {
  AppPreviewFragment,
  PageBuilderAppFragment,
} from './app.fragment.graphql.gen'

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

export type IAppExport = Pick<OGM_TYPES.App, 'id' | 'name' | 'slug'> & {
  pages: Array<IPageExport>
  store: IStoreExport
  domains: Array<IDomainExport>
}
