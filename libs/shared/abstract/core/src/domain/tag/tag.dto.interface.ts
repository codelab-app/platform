import { IAuth0Id } from '../user'
import { TagFragment } from './tag.fragment.graphql.gen'
import type { ITag, ITagRef } from './tag.model.interface'

export interface ICreateTagDTO {
  name: string
  parentTagId?: string
  auth0Id: IAuth0Id
}

export interface IUpdateTagDTO {
  name: string
}

export type ITagDTO = TagFragment

export type ITagGraphDTO = ITagDTO & {
  descendants: Array<ITagRef>
}

export interface ITagExport {
  id: string
  name: string
  children?: Array<Pick<ITag, 'id'>>
  parent?: Pick<ITag, 'id'>
}
