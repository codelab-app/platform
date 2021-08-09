import { JwtPayload } from '@codelab/backend'
import { Field, InputType } from '@nestjs/graphql'
import { CreateTagInput } from './create-tag.input'

export class CreateTagRequest {
  declare input: CreateTagInput

  declare owner: JwtPayload
}
