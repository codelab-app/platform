import { IPreRenderType } from '@codelab/shared/abstract/core'
import { PreRenderFragment } from './pre-render.fragment.graphql.gen'

export interface ICreatePreRenderDTO {
  id?: string
  name: string
  pageId: string
  code: string
  type: IPreRenderType
}

export type IUpdatePreRenderDTO = ICreatePreRenderDTO

export type IPreRenderDTO = PreRenderFragment
