import {
  CreateAppInput,
  DeleteAppInput,
} from '@codelab/frontend/abstract/codegen'
import { print } from 'graphql'
import {
  E2eCreateAppGql,
  E2eDeleteAppGql,
} from '../graphql/app.api.graphql.gen'

const defaultCreateAppInput: CreateAppInput = {
  name: 'Test app',
}

export const createApp = (input: CreateAppInput = defaultCreateAppInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateAppGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createApp)
}

Cypress.Commands.add('createApp', createApp)

export const deleteApp = (input: DeleteAppInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eDeleteAppGql),
      variables: { input },
    })
    .then((r) => r.body.data)
}

Cypress.Commands.add('deleteApp', deleteApp)
