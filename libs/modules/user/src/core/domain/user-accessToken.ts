import { ValueObject } from '@codelab/backend'

export interface UserAccessTokenProps {
  value: string
}

export class UserAccessToken extends ValueObject<UserAccessTokenProps> {
  declare value: string
}
