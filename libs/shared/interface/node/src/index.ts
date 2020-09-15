import { NodeDtoA, NodeDtoI } from './dto/node-dto'
import { NodeType, NodeTypeEnum } from './enums/node-enum'
import {
  isModelNode,
  isReactNode,
  isReactNodeArray,
  isRefNode,
  isSchemaNode,
  isTreeNode,
} from './guards/node-guards'
import type {
  HasChildren,
  HasID,
  HasParent,
  Mapper,
  NodeInterface,
} from './node'
import { hasChildren } from './node'
import type { SchemaDefinition, SchemaTypeOpts } from './node-schema--props'

export type {
  SchemaDefinition,
  SchemaTypeOpts,
  NodeInterface,
  HasID,
  HasChildren,
  HasParent,
  Mapper,
  NodeType,
  NodeDtoA,
  NodeDtoI,
}

export {
  NodeTypeEnum,
  isModelNode,
  isReactNode,
  isReactNodeArray,
  isRefNode,
  isSchemaNode,
  isTreeNode,
  hasChildren,
}
