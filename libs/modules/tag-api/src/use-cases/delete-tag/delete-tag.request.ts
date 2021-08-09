import { Field, InputType } from '@nestjs/graphql'
import { DeleteTagInput } from './delete-tag.input'

export class DeleteTagRequest {
  declare input: DeleteTagInput
}
