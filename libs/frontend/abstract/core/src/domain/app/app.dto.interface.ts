import type {
  AppPreviewFragment,
  PageBuilderAppFragment,
} from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  id: string
  name: string
  ownerId: string
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'ownerId' | 'id'>

export type IAppDTO = AppPreviewFragment

/**
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  app: PageBuilderAppFragment
  pageId: string
}
