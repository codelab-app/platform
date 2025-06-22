import * as Types from '@codelab/shared-infra-gqlgen'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import { GetPageBuilderDocument } from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  GetPageBuilder: (variables: Types.GetPageBuilderQueryVariables) =>
    gqlRequest(client, GetPageBuilderDocument.toString(), variables),
})
