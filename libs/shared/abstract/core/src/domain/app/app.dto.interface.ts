import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IDomainExport } from '../domain'
import { IPageExport } from '../page'
import { IStoreExport } from '../store'
import { AppPreviewFragment } from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  id?: string
  name: string
  slug: string
  auth0Id: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'auth0Id' | 'id'>

export type IAppDTO = AppPreviewFragment

export type IAppExport = Pick<
  OGM_TYPES.App,
  'id' | 'name' | 'rootElement' | 'slug'
> & {
  pages: Array<IPageExport>
  store: IStoreExport
  providerElements: Array<OGM_TYPES.Element>
  domains: Array<IDomainExport>
}
