import * as Types from '@codelab/shared-infra-gqlgen';

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import { GetPageProductionDocument } from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({GetPageProduction: (variables: Types.GetPageProductionQueryVariables) => gqlRequest(client, GetPageProductionDocument.toString(), variables)})
