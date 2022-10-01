import { IFieldProps } from '@codelab/frontend/abstract/core'
import { FieldCreateInput } from '@codelab/shared/abstract/codegen'
import { print } from 'graphql'
import { UpsertFieldDocument } from 'libs/frontend/domain/type/src/graphql/field.endpoints.graphql.gen'

export const createField = (input: FieldCreateInput) =>
  cy
    .graphqlRequest({
      query: print(UpsertFieldDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createField as IFieldProps)
