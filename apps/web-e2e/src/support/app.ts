import { CreateAppGql, DeleteAppGql } from '@codelab/frontend/modules/app'
import { CreateAppInput, DeleteAppInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

const defaultCreateAppInput: CreateAppInput = {
  name: 'Test app',
}

export const createApp = (input: CreateAppInput = defaultCreateAppInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateAppGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createApp)
}

Cypress.Commands.add('createApp', createApp)

export const deleteApp = (input: DeleteAppInput) => {
  return cy
    .graphqlRequest({
      query: print(DeleteAppGql),
      variables: { input },
    })
    .then((r) => r.body.data)
}

Cypress.Commands.add('deleteApp', deleteApp)
