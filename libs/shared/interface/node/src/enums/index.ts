import { NodeTypeModelEnum } from './node-enum--model'
import { NodeTypeReactEnum } from './node-enum--react'
import { NodeTypeTreeEnum } from './node-enum--tree'

/**
 * We have 3 top level node types `Tree`, `Model`, & `React`, each can be broken down further
 */

export type NodeTypeEnum =
  | NodeTypeModelEnum
  | NodeTypeTreeEnum
  | NodeTypeReactEnum

export type NodeTypeLiteral =
  | keyof typeof NodeTypeModelEnum
  | keyof typeof NodeTypeTreeEnum
  | keyof typeof NodeTypeReactEnum
