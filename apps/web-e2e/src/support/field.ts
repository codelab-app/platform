import { FieldCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { print } from 'graphql'
import { E2eCreateFieldDocument } from '../graphql/field.api.v2.1.graphql.gen'

export const createField = (input: FieldCreateInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreateFieldDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createField)
}

Cypress.Commands.add('createField', createField)
