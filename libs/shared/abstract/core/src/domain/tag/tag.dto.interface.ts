import { Required } from 'utility-types'
import { IAuth0Id } from '../user'
import { TagFragment } from './tag.fragment.graphql.gen'
import type { ITag } from './tag.model.interface'

export interface ICreateTagDTO {
  name: string
  parentTagId?: string
  auth0Id: IAuth0Id
}

export interface IUpdateTagDTO {
  name: string
}

export type ITagDTO = Required<Partial<TagFragment>, 'id' | 'name'>

export interface ITagExport {
  id: string
  name: string
  children?: Array<Pick<ITag, 'id'>>
  parent?: Pick<ITag, 'id'>
}
