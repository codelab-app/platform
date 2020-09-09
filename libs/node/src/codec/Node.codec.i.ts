import { Props } from '@codelab/shared/interface'
import { SchemaNodeI } from '../subtypes/schema/Node-schema'
import { ReactNodeA, ReactNodeI } from '../subtypes/react/Node-react'
import { TreeNodeA, TreeNodeI } from '../subtypes/tree/Node-tree'
import { RefNodeA, RefNodeI } from '../subtypes/ref/Node-ref'
import { ModelNodeI } from '../subtypes/model/Node-model'

export type NodeI<P extends Props = any> =
  | ReactNodeI<P>
  | TreeNodeI<P>
  | RefNodeI<P>
  | SchemaNodeI<P>
  | ModelNodeI<P>

export type NodeA<P extends Props = any> =
  | ReactNodeA<P>
  | TreeNodeA<P>
  | RefNodeA<P>
// | SchemaNodeI<P>
// | ModelNodeI<P>
