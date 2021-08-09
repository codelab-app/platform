import { Field, InputType } from '@nestjs/graphql'
import { UpdateTagInput } from './update-tag.input'

export class UpdateTagRequest {
  declare input: UpdateTagInput
}
