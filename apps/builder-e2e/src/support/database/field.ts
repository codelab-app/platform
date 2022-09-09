import { FieldCreateInput } from '@codelab/shared/abstract/codegen'
import { IFieldProps } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import { CreateFieldDocument } from '../../../../../libs/frontend/modules/type/src/graphql/field.endpoints.graphql.gen'

export const createField = (input: FieldCreateInput) =>
  cy
    .graphqlRequest({
      query: print(CreateFieldDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.createField as IFieldProps)
