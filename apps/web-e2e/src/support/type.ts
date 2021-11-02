import { CreateTypeInput } from '@codelab/frontend/abstract/codegen'
import { print } from 'graphql'
import { E2eCreateTypeGql } from '../graphql/type.api.graphql.gen'

export const createType = (input: CreateTypeInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateTypeGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createType)
}

Cypress.Commands.add('createType', createType)
