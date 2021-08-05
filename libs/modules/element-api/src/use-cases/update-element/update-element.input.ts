import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateElementData {
  @Field()
  declare name: string

  @Field(() => String, { nullable: true })
  declare css: string | null

  @Field({ nullable: true })
  declare atomId?: string

  @Field({ nullable: true })
  declare componentId?: string
}

// Note that moveElement is there for updating order and parent
@InputType()
export class UpdateElementInput {
  @Field(() => UpdateElementData)
  declare updateData: UpdateElementData

  @Field()
  declare elementId: string
}
