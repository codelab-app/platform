import { TagFragment } from './tag.fragment.graphql.gen'

export interface ICreateTagDTO {
  name: string
  parentTagId?: string
}

export interface IUpdateTagDTO {
  name: string
}

export type ITagDTO = TagFragment
