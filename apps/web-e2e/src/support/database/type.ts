import { PrimitiveTypeCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { print } from 'graphql'
import { E2eCreatePrimitiveTypesDocument } from './graphql/type.api.v2.1.graphql.gen'

export const createType = (input: PrimitiveTypeCreateInput) =>
  cy
    .graphqlRequest({
      query: print(E2eCreatePrimitiveTypesDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createType)
