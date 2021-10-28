import * as Types from '@codelab/shared/codegen/graphql';

export type __UserFragment = { id: string, auth0Id: string, roles: Array<Types.Role> };

export const __UserFragmentDoc = `
    fragment __User on User {
  id
  auth0Id
  roles
}
    `;