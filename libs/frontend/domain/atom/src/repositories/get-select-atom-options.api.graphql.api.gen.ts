import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'

export const getSdk = () => ({
  GetSelectAtomOptions: (variables: GetSelectAtomOptionsQueryVariables) =>
    gqlRequest(GetSelectAtomOptionsDocument.toString(), variables),
})
