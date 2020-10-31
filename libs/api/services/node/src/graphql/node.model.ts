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
  REACT_HTML_P = 'REACT_HTML_P',
  REACT_HTML_A = 'REACT_HTML_A',
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

  @Directive('@relation(name: "child", direction: "OUT")')
  @Field(() => [Node], { nullable: true })
  declare children: Array<Node>

  @Directive('@relation(name: "parent", direction: "IN")')
  @Directive('@cypher(statement:"MATCH (this)-->(parent) RETURN parent")')
  @Field(() => Node, { nullable: true })
  declare parent: Node

  constructor(node: Partial<Node>) {
    Object.assign(node)
  }
}
