import { CreateTypeGql } from '@codelab/frontend/modules/type'
import { CreateTypeInput } from '@codelab/shared/codegen/graphql'
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
