import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'

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

  @Field(() => NodeType)
  declare type: object

  @Directive('@relation(name: "children", direction: "OUT")')
  @Field(() => [NodeType])
  declare children: Array<NodeType>

  constructor(node: Partial<Node>) {
    Object.assign(node)
  }
}
