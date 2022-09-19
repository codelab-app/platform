import { ICacheService } from '../../service'
import type { ITagDTO } from './tag.dto.interface'

export interface ITagNode {
  id: string
  label: string
  children: Array<string>
  isRoot?: boolean
}

export interface ITag extends ICacheService<ITagDTO, ITag>, ITagNode {
  id: string
  name: string
  children: Array<string>
}

export type ITagRef = string
