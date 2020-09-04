import { Props } from '@codelab/props'
import { ReactNodeA, ReactNodeI } from './Node-react'
import { TreeNodeA, TreeNodeI } from './Node-tree'
import { RefNodeA, RefNodeI } from './Node-ref'

export type NodeI<P extends Props = any> =
  | ReactNodeI<P>
  | TreeNodeI<P>
  | RefNodeI<P>

export type NodeA<P extends Props = any> =
  | ReactNodeA<P>
  | TreeNodeA<P>
  | RefNodeA<P>
