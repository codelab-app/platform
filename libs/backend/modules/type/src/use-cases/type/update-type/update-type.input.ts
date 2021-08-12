import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTypeData {
  @Field()
  declare name: string
}

@InputType()
export class UpdateTypeInput {
  @Field(() => UpdateTypeData)
  declare updateData: UpdateTypeData

  @Field()
  declare typeId: string
}
