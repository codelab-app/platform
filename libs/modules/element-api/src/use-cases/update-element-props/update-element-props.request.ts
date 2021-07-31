import { JwtPayload } from '@codelab/backend'
import { UpdateElementPropsInput } from './update-element-props.input'

export class UpdateElementPropsRequest {
  declare input: UpdateElementPropsInput

  declare currentUser: JwtPayload
}
