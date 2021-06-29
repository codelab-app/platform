import { Field, InputType } from '@nestjs/graphql'
import { CreateTypeInput } from '../../type'

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

  @Field()
  declare name: string

  @Field(() => String, { nullable: true })
  declare description?: string | null

  @Field()
  declare interfaceId: string

  @Field(() => TypeRef)
  declare type: TypeRef

  // @Field(() => [CreateDecoratorInput])
  // declare decorators: Array<CreateDecoratorInput>
}
