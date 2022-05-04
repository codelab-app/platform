import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IPageExport } from '../page'
import { AppFragment } from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  id?: string
  name: string
  auth0Id: string
  storeId?: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'auth0Id' | 'id'>

export type IAppDTO = AppFragment

// export type IAppExport = {
//   id: string
//   name: string
//   rootProviderElement: {
//     id: string
//   }
//   pages: Array<IPageExport>
//   providerElements: Array<IElementExport>
// }

export type IAppExport = Pick<
  OGM_TYPES.App,
  'id' | 'name' | 'rootProviderElement'
> & {
  pages: Array<IPageExport>
  providerElements: Array<OGM_TYPES.Element>
}
