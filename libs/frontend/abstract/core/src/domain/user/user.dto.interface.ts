import { IRole } from '@codelab/shared/abstract/core'
import { UserFragment } from './user.fragment.graphql.gen'

// TODO: temporarily cast user.roles to role[], because types generated in api is string[] because using roles[] makes the insertUser broken
export type IUserDTO = UserFragment & { roles: Array<IRole> }
