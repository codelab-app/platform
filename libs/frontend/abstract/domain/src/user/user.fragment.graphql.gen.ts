import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
export type UserFragment = {
  auth0Id: string
  email: string
  id: string
  preferences?: string | null
  roles?: Array<Types.Role> | null
  username: string
  apps: Array<{ id: string }>
}

export const UserFragmentDoc = `
    fragment User on User {
  apps {
    id
  }
  auth0Id
  email
  id
  preferences
  roles
  username
}
    `
