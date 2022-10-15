import { IFieldDTO } from '@codelab/frontend/abstract/core'
import { FieldCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { CreateFieldsDocument } from 'libs/frontend/domain/type/src/graphql/field.endpoints.graphql.gen'

export const createField = (input: FieldCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateFieldsDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createFields as Array<IFieldDTO>)
