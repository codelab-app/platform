import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'

export enum NodeType {
  REACT_BUTTON,
  REACT_DIV,
}

registerEnumType(NodeType, { name: 'NodeType' })

@ObjectType()
@Directive('@key(fields: "id")')
export class Node {
  @Field((type) => ID)
  declare id: number

  @Field(() => NodeType)
  declare type: object

  constructor(node: Partial<Node>) {
    Object.assign(node)
  }
}
