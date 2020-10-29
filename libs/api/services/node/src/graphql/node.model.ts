import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import {relation} from "cypher-query-builder"


export enum NodeType {
  REACT_BUTTON = 'REACT_BUTTON',
  REACT_DIV = 'REACT_DIV',
}

export const NodeTypeLiteral = Object.values

registerEnumType(NodeType, { name: 'NodeType' })

@ObjectType()
@Directive('@key(fields: "id")')
export class Node {
  @Field((type) => ID)
  declare id: number

  // @Directive('@upper')
  @Field(() => NodeType)
  declare type: object

  @Directive('@relation(name: "parent", direction: "OUT")')
  @Field(() => Node)
  declare node: Node

  constructor(node: Partial<Node>) {
    Object.assign(node)
  }
}
