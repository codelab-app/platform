import { Field, InputType } from '@nestjs/graphql'

export interface CreateUserDTO {
  email: string
  password: string
}

/**
 * Vertical slice, include infrastructure/adapter dto's here as well
 */
@InputType()
export class CreateUserInput implements CreateUserDTO {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
