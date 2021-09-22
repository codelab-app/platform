import { DeleteAppGql } from '@codelab/frontend/modules/app'
import { DeleteAppInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const deleteApp = (input: DeleteAppInput) => {
  return cy
    .graphqlRequest({
      query: print(DeleteAppGql),
      variables: { input },
    })
    .then((r) => r.body.data)
}

Cypress.Commands.add('deleteApp', deleteApp)
