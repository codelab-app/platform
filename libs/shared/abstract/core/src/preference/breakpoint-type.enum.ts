/**
 * Auth0 post registration hook only works for database, social login can't assign a role.
 *
 * We don't set a role for regular users
 */
import { BreakpointType } from '@codelab/shared/infra/gql'

export { BreakpointType as IBreakpointType }
