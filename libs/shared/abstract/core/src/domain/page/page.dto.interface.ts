import { PageFragment } from './page.fragment.graphql.gen'

export interface ICreatePageDTO {
  name: string
  appId: string
}

export type IUpdatePageDTO = ICreatePageDTO

export type IPageDTO = PageFragment
