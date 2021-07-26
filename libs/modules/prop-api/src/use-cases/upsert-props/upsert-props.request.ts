import { JwtPayload } from '@codelab/backend'
import { UpsertPropsInput } from './upsert-props.input'

export class UpsertPropsRequest {
  declare input: Array<UpsertPropsInput>

  declare currentUser: JwtPayload
}
