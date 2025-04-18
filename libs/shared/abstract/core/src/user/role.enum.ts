/**
 * Auth0 post registration hook only works for database, social login can't assign a role.
 *
 * We don't set a role for regular users
 */
import { Role } from '@codelab/shared-infra-gqlgen'

export { Role as IRole }
