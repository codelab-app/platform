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
