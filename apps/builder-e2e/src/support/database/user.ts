import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { CreateUserMutationVariables } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateUserDocument } from 'libs/frontend/domain/user/src/graphql/user.endpoints.graphql.gen'

export const getCurrentOwner = () => {
  return cy.request('/api/auth/me').then<IAuth0Owner>((result) => {
    return { auth0Id: result.body.sub }
  })
}

export const createUser = (variables: CreateUserMutationVariables) =>
  cy.graphqlRequest({
    query: print(CreateUserDocument),
    variables,
  })
