import { Props } from '@codelab/props'
import { ReactNodeA, ReactNodeI } from '../subtypes/react/Node-react'
import { TreeNodeA, TreeNodeI } from '../subtypes/tree/Node-tree'
import { RefNodeA, RefNodeI } from '../subtypes/ref/Node-ref'

export type NodeI<P extends Props = any> =
  | ReactNodeI<P>
  | TreeNodeI<P>
  | RefNodeI<P>

export type NodeA<P extends Props = any> =
  | ReactNodeA<P>
  | TreeNodeA<P>
  | RefNodeA<P>
