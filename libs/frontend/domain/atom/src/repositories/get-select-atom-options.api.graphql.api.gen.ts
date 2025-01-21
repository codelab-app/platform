import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gqlgen'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetSelectAtomOptions: (variables: GetSelectAtomOptionsQueryVariables) =>
    gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables),
})
