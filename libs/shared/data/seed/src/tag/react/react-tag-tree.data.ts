import type { TagNode } from '../antd'
import { ReactTag } from './react-tags.data'

export const reactTagTree: Partial<Record<ReactTag, Array<TagNode>>> = {
  [ReactTag.ReactFragment]: [],
}
