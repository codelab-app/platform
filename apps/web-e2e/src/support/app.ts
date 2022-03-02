import {
  AppCreateInput,
  AppDeleteInput,
} from '@codelab/shared/abstract/codegen-v2'
import { print } from 'graphql'
import { E2eDeleteAppDocument } from '../graphql/app.api.v2.1.graphql.gen'

const defaultCreateAppInput: AppCreateInput = {
  name: 'Test app',
}

export const createApp = (input: AppCreateInput = defaultCreateAppInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eDeleteAppDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.apps)
}

Cypress.Commands.add('createApp', createApp)

export const deleteApp = (input: AppDeleteInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eDeleteAppDocument),
      variables: { input },
    })
    .then((r) => r.body.data)
}

Cypress.Commands.add('deleteApp', deleteApp)
