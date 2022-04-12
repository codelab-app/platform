import { ComponentFragment } from './component.fragment.graphql.gen'

export interface ICreateComponentDTO {
  name: string
}

export type IUpdateComponentDTO = ICreateComponentDTO

export type IComponentDTO = ComponentFragment
