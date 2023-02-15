import { AntdTag, antdTagTree } from './antd'
import { HtmlTag, htmlTagTree } from './html'
import { ReactTag } from './react'
import { reactTagTree } from './react/react-tag-tree.data'

export * from './antd'
export * from './builder'
export * from './html'
export * from './react'

export const allTags = [
  ...Object.values(AntdTag),
  ...Object.values(HtmlTag),
  ...Object.values(ReactTag),
]

export const allTagTree = Object.assign(antdTagTree, htmlTagTree, reactTagTree)
