import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gql'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetSelectAtomOptions: (variables: GetSelectAtomOptionsQueryVariables) =>
    gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables),
})
