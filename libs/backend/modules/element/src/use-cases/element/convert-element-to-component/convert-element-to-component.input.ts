import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ConvertElementToComponentInput {
  @Field()
  declare elementId: string

  @Field(() => String, {
    nullable: true,
    description: 'Leave out to infer it automatically',
  })
  declare componentName?: string
}
