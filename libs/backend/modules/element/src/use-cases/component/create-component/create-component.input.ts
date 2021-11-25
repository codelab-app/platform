import { Field, InputType } from '@nestjs/graphql'

// If you're looking for CreateComponentService - use CreateElementService instead and provide isComponent: true
// This is just as a facade input for creating an element with component tag

@InputType()
export class CreateComponentInput {
  @Field()
  declare name: string
}
