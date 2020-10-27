import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class HealthOutput {
  @Field((type) => Boolean, { nullable: true })
  isRunning = false
}
