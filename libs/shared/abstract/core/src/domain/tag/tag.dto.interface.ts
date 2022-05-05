import { IAuth0ID } from '../user'
import { TagFragment } from './tag.fragment.graphql.gen'
import { ITagRef } from './tag.model.interface'

export interface ICreateTagDTO {
  name: string
  parentTagId?: string
  auth0Id: IAuth0ID
}

export interface IUpdateTagDTO {
  name: string
}

export type ITagDTO = TagFragment

export type ITagGraphDTO = ITagDTO & {
  descendants: Array<ITagRef>
}
