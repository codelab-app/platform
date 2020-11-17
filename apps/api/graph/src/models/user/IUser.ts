import { Field, Int, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class IUser {
  @Field((type) => Int)
  declare id: number

  @Field({ nullable: false })
  declare email: string
}
