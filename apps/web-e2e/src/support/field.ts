import { CreateFieldInput } from '@codelab/frontend/abstract/codegen'
import { print } from 'graphql'
import { E2eCreateFieldGql } from '../graphql/field.api.graphql.gen'

export const createField = (input: CreateFieldInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateFieldGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createField)
}

Cypress.Commands.add('createField', createField)
