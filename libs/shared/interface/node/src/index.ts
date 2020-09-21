import { isID, isNode, isNodeDtoA } from './assertions/node-assertions'
import { NodeCreateDto, NodeDtoA, NodeDtoI } from './dto'
import {
  NodeDtoModelA,
  NodeDtoModelI,
  NodeDtoSchemaA,
  NodeDtoSchemaI,
} from './dto/node-dto--model'
import { NodeDtoReactA, NodeDtoReactI } from './dto/node-dto--react'
import {
  NodeDtoTreeA,
  NodeDtoTreeI,
  NodeDtoTreeRefA,
  NodeDtoTreeRefI,
} from './dto/node-dto--tree'
import {
  BaseNodeTypeEnum,
  NodeType,
  NodeTypeEnum,
  NodeTypeLiteral,
  nodeTypeEnumEntries,
  nodeTypeLiterals,
} from './enums'
import { NodeTypeReactEnum } from './enums/node-enum--react'
import {
  isModelNode,
  isReactNode,
  isReactNodeArray,
  isRefNode,
  isSchemaNode,
  isTreeNode,
} from './guards/node-guards'
import type { HasChildren, HasParent, Mapper, Node } from './node'
import { hasChildren } from './node'
import type { SchemaDefinition, SchemaTypeOpts } from './node-schema--props'

export type {
  Node,
  NodeTypeEnum,
  NodeType,
  SchemaDefinition,
  SchemaTypeOpts,
  NodeDtoA,
  HasParent,
  Mapper,
  HasChildren,
  NodeTypeLiteral,
  NodeDtoI,
  NodeCreateDto,
  NodeDtoReactI,
  NodeDtoTreeRefI,
  NodeDtoTreeI,
  NodeDtoModelI,
  NodeDtoSchemaI,
  NodeDtoReactA,
  NodeDtoTreeRefA,
  NodeDtoTreeA,
  NodeDtoModelA,
  NodeDtoSchemaA,
}

export {
  isNode,
  isNodeDtoA,
  isID,
  BaseNodeTypeEnum,
  NodeTypeReactEnum,
  nodeTypeLiterals,
  nodeTypeEnumEntries,
  isModelNode,
  isReactNode,
  isReactNodeArray,
  isRefNode,
  isSchemaNode,
  isTreeNode,
  hasChildren,
}
