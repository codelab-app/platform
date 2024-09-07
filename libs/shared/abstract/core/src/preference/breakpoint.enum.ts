/**
 * Auth0 post registration hook only works for database, social login can't assign a role.
 *
 * We don't set a role for regular users
 */
import { Breakpoint } from '@codelab/shared/infra/gql'

export { Breakpoint as IBreakpoint }
