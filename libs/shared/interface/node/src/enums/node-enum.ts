/**
 * We have 3 top level node types `Tree`, `Model`, & `React`, each can be broken down further
 */
import { ModelType } from './node-enum--model'
import { ReactType } from './node-enum--react'
import { TreeType } from './node-enum--tree'

export enum BaseNodeType {
  React = 'React',
  Tree = 'Tree',
  Model = 'Model',
  Field = 'Field',
}

/**
 * used for forms
 */
export const nodeTypeEntries = Object.entries(BaseNodeType)

export type NodeType = ModelType | TreeType | ReactType

/**
 * All possible values
 */
export const nodeTypeLiterals: Array<NodeTypeLiteral> = [
  ...Object.values(ModelType),
  ...Object.values(TreeType),
  ...Object.values(ReactType),
]

export type NodeTypeLiteral =
  | keyof typeof ModelType
  | keyof typeof TreeType
  | keyof typeof ReactType
