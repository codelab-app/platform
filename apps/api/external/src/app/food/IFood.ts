import { Field, Int, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class IFood {
  @Field((type) => Int)
  declare id: number

  @Field({ nullable: false })
  declare name: string

  @Field({ nullable: true })
  declare description: string

  @Field((type) => Int, { nullable: true })
  declare price: number
}
