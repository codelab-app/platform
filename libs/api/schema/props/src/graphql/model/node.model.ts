import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop } from '@codelab/api/schema/props'

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Node {
  @Field(() => ID)
  @Directive('@external')
  declare id: number

  @Field(() => Prop, { nullable: true })
  props?: Prop
}
