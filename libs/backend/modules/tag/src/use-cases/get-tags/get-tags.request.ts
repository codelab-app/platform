import { JwtPayload } from '@codelab/backend/infra'

export class GetTagsRequest {
  // declare input: GetTagsInput

  declare owner: JwtPayload
}
