import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  declare email: string

  @Field({ nullable: true })
  declare name: string
}
