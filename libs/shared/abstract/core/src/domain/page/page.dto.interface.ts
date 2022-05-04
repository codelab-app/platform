import { IComponentExport } from '../component'
import { IElementExport } from '../element'
import { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  id?: string
  // Allow us to specify rootElementId
  rootElementId?: string

  name: string
  appId: string
}

export type IUpdatePageDTO = Omit<ICreatePageDTO, 'id' | 'rootElementId'>

export type IPageDTO = PageFragment

export type IPageExport = {
  id: string
  name: string
  rootElement: {
    id: string
    name: string | null
  }
  elements: Array<IElementExport>
  components: Array<IComponentExport>
}
