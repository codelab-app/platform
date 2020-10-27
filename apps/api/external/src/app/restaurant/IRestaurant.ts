import { Field, Int, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class IRestaurant {
  @Field((type) => Int)
  id?: number

  @Field({ nullable: false })
  declare name: string
}
