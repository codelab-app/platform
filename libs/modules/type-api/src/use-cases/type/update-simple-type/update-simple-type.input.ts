import { Field, InputType } from '@nestjs/graphql'
import { PrimitiveType } from '../../../models'

@InputType()
export class UpdateSimpleTypeData {
  @Field(() => PrimitiveType)
  declare primitiveType: PrimitiveType

  @Field()
  declare name: string
}

@InputType()
export class UpdateSimpleTypeInput {
  @Field()
  declare typeId: string

  @Field(() => UpdateSimpleTypeData)
  declare updateData: UpdateSimpleTypeData
}
