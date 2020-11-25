import { Field, InterfaceType } from '@nestjs/graphql'
import { CodelabAppEntity } from '../app/codelab-app.entity'

@InterfaceType()
export abstract class IUser {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare email: string

  @Field((returns) => [CodelabAppEntity])
  declare apps: Array<CodelabAppEntity>
}
