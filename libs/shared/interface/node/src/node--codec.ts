import { Props } from '@codelab/shared/interface/props'
import { ReactNodeI, ReactNodeA } from './subtypes/react/node-react'
import { TreeNodeI, TreeNodeA } from './subtypes/tree/node-tree'
import { SchemaNodeI } from './subtypes/schema/node-schema'
// import { ModelNodeI } from './subtypes/model/node-model'
// import { RefNodeA, RefNodeI } from './subtypes/ref/node-ref'

export type NodeI<P extends Props = any> =
  | ReactNodeI<P>
  | TreeNodeI<P>
  // | RefNodeI<P>
  | SchemaNodeI<P>
// | ModelNodeI<P>

export type NodeA<P extends Props = any> = ReactNodeA<P> | TreeNodeA<P>
// | RefNodeA<P>
// | SchemaNodeI<P>
// | ModelNodeI<P>
