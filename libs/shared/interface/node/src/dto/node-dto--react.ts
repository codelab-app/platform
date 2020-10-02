import { ReactTypeLiteral } from '../enums'
import { NodeA, NodeI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeReactI<P extends Props = Props> = NodeI<ReactTypeLiteral, P>

export type NodeReactA<P extends Props = Props> = NodeA<ReactTypeLiteral, P>
