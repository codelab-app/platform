import { FieldCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { E2eCreateFieldDocument } from './graphql/field.endpoints.graphql.gen'

export const createField = (input: FieldCreateInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreateFieldDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createField)
