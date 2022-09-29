import { ITag } from '../domain/tag'

export interface ITagExport {
  id: string
  name: string
  children?: Array<Pick<ITag, 'id'>>
  parent?: Pick<ITag, 'id'>
}
