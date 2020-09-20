import { NodeCreateDto, NodeDtoA, NodeDtoI } from './dto'
import { NodeModelDtoA, NodeSchemaDtoA } from './dto/node-dto--model'
import { NodeReactDtoA } from './dto/node-dto--react'
import { NodeRefDtoA, NodeTreeDtoA } from './dto/node-dto--tree'
import { NodeTypeEnum, NodeTypeLiteral } from './enums'
import {
  isModelNode,
  isReactNode,
  isReactNodeArray,
  isRefNode,
  isSchemaNode,
  isTreeNode,
} from './guards/node-guards'
import type { HasParent, Mapper } from './node'
import { hasChildren } from './node'
import type { SchemaDefinition, SchemaTypeOpts } from './node-schema--props'

export type {
  SchemaDefinition,
  SchemaTypeOpts,
  NodeDtoA,
  HasParent,
  Mapper,
  NodeTypeLiteral,
  NodeDtoI,
  NodeCreateDto,
  NodeReactDtoA,
  NodeRefDtoA,
  NodeTreeDtoA,
  NodeModelDtoA,
  NodeSchemaDtoA,
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
