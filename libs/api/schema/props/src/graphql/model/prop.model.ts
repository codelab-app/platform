import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class Prop {
  @Field((type) => ID)
  declare id: number

  @Field(() => String)
  declare value: string

  // constructor(prop: Partial<Prop>) {
  //   Object.assign(this, prop)
  // }
}
