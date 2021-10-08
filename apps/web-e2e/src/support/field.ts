import { CreateFieldInput } from '@codelab/frontend/abstract/codegen'
import { CreateFieldGql } from '@codelab/frontend/modules/type'
import { print } from 'graphql'

export const createField = (input: CreateFieldInput) => {
  return cy
    .graphqlRequest({
      query: print(CreateFieldGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createField)
}

Cypress.Commands.add('createField', createField)
