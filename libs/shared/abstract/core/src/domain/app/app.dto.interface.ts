import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPageExport } from '../page'
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
  providerElements: Array<OGM_TYPES.Element>
}
