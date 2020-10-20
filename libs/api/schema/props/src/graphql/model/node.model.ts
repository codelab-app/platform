import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop } from '.'

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Node {
  @Field(() => ID)
  @Directive('@external')
  declare id: number

  @Field(() => Prop, { nullable: true })
  declare props?: Prop

  // constructor(node: Partial<Node>) {
  //   Object.assign(node)
  // }
}
