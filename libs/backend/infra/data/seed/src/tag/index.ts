import { antdTagTree } from './antd'
import { htmlTagTree } from './html'
import { reactTagTree } from './react'

export const allTagTree = Object.assign(antdTagTree, htmlTagTree, reactTagTree)

export * from './antd'
export * from './html'
export * from './react'
