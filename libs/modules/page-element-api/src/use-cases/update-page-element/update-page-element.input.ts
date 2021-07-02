import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePageElementData {
  @Field()
  declare name: string

  @Field(() => String, { nullable: true })
  declare css: string | null

  @Field({ nullable: true })
  declare atomId?: string
}

// Note that movePageElement is there for updating order and parent
@InputType()
export class UpdatePageElementInput {
  @Field(() => UpdatePageElementData)
  declare updateData: UpdatePageElementData

  @Field()
  declare pageElementId: string
}
