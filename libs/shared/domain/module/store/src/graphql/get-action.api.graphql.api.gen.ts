import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { ActionFragmentDoc } from '@codelab/shared/infra/gqlgen'

import { type GetActionsQueryVariables } from '@codelab/shared/infra/gqlgen'
import { GetActionsDocument } from './get-action.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  GetActions: (variables: GetActionsQueryVariables) =>
    gqlRequest(client, GetActionsDocument.toString(), variables),
})
