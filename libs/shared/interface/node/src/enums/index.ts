import { NodeTypeModelEnum } from './node-enum--model'
import { NodeTypeReactEnum } from './node-enum--react'
import { NodeTypeTreeEnum } from './node-enum--tree'

/**
 * We have 3 top level node types `Tree`, `Model`, & `React`, each can be broken down further
 */
export enum BaseNodeTypeEnum {
  React = 'React',
  Tree = 'Tree',
  Model = 'Model',
}

export const nodeTypeEnumEntries = Object.entries(BaseNodeTypeEnum)

export type NodeType = {
  [BaseNodeTypeEnum.Model]: NodeTypeModelEnum
  [BaseNodeTypeEnum.Tree]: NodeTypeTreeEnum
  [BaseNodeTypeEnum.React]: NodeTypeReactEnum
}

export type NodeTypeEnum =
  | NodeTypeModelEnum
  | NodeTypeTreeEnum
  | NodeTypeReactEnum

export type NodeTypeLiteral =
  | keyof typeof NodeTypeModelEnum
  | keyof typeof NodeTypeTreeEnum
  | keyof typeof NodeTypeReactEnum

export const nodeTypeLiterals: Array<string> = [
  ...Object.values(NodeTypeModelEnum),
  ...Object.values(NodeTypeTreeEnum),
  ...Object.values(NodeTypeReactEnum),
]
