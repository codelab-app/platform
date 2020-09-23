// React
import { ReactTypeLiteral } from '../enums/node-enum--react'
import { NodeA, NodeI } from './node-dto'
import { Props } from '@codelab/shared/interface/props'

export type NodeReactI<P extends Props = {}> = NodeI<ReactTypeLiteral, P>

export type NodeReactA<P extends Props = {}> = NodeA<ReactTypeLiteral, P>
