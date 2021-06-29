import { JwtPayload } from '@codelab/modules/auth-api'
import { UpsertPropsInput } from './upsert-props.input'

export class UpsertPropsRequest {
  declare input: Array<UpsertPropsInput>

  declare currentUser: JwtPayload
}
