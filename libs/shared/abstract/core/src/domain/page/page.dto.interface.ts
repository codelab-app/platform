import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IElementExport } from '../element'
import { IAuth0Id } from '../user'
import { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  id?: string
  // Allow us to specify rootElementId
  rootElementId?: string

  name: string
  appId: string
  auth0Id: IAuth0Id
}

export type IUpdatePageDTO = Omit<
  ICreatePageDTO,
  'id' | 'rootElementId' | 'auth0Id'
>

export type IPageDTO = PageFragment

export type IPageExport = Pick<OGM_TYPES.Page, 'id' | 'name'> & {
  rootElement: Pick<IElementExport, 'id' | 'name'>
  elements: Array<OGM_TYPES.Element>
  components: Array<OGM_TYPES.Component>
}

// export type IPageExport = {
//   id: string
//   name: string
//   rootElement: {
//     id: string
//     name: string | null
//   }
//   elements: Array<IElementExport>
//   components: Array<IComponentExport>
// }
