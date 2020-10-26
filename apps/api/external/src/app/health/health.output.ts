import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class HealthOutput {
  @Field({ nullable: true })
  isRunning = false
}
