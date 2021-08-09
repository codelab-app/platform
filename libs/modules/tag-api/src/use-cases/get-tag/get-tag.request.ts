import { JwtPayload } from '@codelab/backend'
import { Field, InputType } from '@nestjs/graphql'
import { GetTagInput } from './get-tag.input'

export class GetTagRequest {
  declare input: GetTagInput

  declare owner: JwtPayload
}
