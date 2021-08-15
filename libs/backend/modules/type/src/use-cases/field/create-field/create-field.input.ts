import { Field, InputType } from '@nestjs/graphql'
import { CreateTypeInput } from '../../type/create-type'

@InputType()
export class TypeRef {
  @Field(() => String, { nullable: true })
  declare existingTypeId?: string | null

  @Field(() => CreateTypeInput, { nullable: true })
  declare newType?: CreateTypeInput | null
}

@InputType()
export class CreateFieldInput {
  @Field()
  declare key: string

  @Field(() => String, { nullable: true })
  declare name?: string

  @Field(() => String, { nullable: true })
  declare description?: string

  @Field({ description: 'The interface to add fields to' })
  declare interfaceId: string

  @Field(() => TypeRef)
  declare type: TypeRef
}
