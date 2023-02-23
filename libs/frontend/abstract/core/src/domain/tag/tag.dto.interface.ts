import type { Required } from 'utility-types'
import type { TagFragment } from './tag.fragment.graphql.gen'

export interface ICreateTagDTO {
  name: string
  parentTagId?: string
  auth0Id: string
}

export interface IUpdateTagDTO {
  name: string
}

export type ITagDTO = Required<Partial<TagFragment>, 'id' | 'name'>
