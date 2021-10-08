import { CreateTypeInput } from '@codelab/frontend/abstract/codegen'
import { CreateTypeGql } from '@codelab/frontend/modules/type'
import { print } from 'graphql'

export const createType = (input: CreateTypeInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateTypeGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createType)
}

Cypress.Commands.add('createType', createType)
