import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPageExport } from '../page'
import { IStoreExport } from '../store'
import { AppFragment } from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  id?: string
  name: string
  auth0Id: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'auth0Id' | 'id'>

export type IAppDTO = AppFragment

export type IAppExport = Pick<OGM_TYPES.App, 'id' | 'name' | 'rootElement'> & {
  pages: Array<IPageExport>
  store: IStoreExport
  providerElements: Array<OGM_TYPES.Element>
}
