import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetComponentBuilderDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({GetComponentBuilder : (variables: Types.GetComponentBuilderQueryVariables) => gqlRequest(client, GetComponentBuilderDocument.toString(), variables)})