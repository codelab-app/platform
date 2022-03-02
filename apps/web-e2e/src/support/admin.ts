import { print } from 'graphql'
import { E2eResetDataDocument } from '../graphql/admin.api.v2.1.graphql.gen'

export const resetData = () => {
  return cy
    .graphqlRequest({
      query: print(E2eResetDataDocument),
      variables: {},
    })
    .then((r) => r.body.data?.apps)
}

Cypress.Commands.add('resetData', resetData)
