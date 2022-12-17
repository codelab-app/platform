import type { CreateUserMutationVariables } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateUserDocument } from 'libs/frontend/domain/user/src/graphql/user.endpoints.graphql.gen'

export const getCurrentUserId = () => {
  return cy.request('/api/auth/me').then((result) => {
    return result.body.sub
  })
}

export const createUser = (variables: CreateUserMutationVariables) =>
  cy.graphqlRequest({
    query: print(CreateUserDocument),
    variables,
  })
