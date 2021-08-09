import { JwtPayload } from '@codelab/backend'
import { Field, InputType } from '@nestjs/graphql'
import { GetTagsInput } from './get-tags.input'

export class GetTagsRequest {
  // declare input: GetTagsInput

  declare owner: JwtPayload
}
