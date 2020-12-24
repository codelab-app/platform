import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class IPage {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare title: string
}
