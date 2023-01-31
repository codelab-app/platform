import { antdTagTree } from './antd'
import { htmlTagTree } from './html'
import { reactTagTree } from './react/react-tag-tree.data'

export * from './antd'
export * from './builder'
export * from './html'
export * from './react'

export const allTagTree = Object.assign(antdTagTree, htmlTagTree, reactTagTree)
