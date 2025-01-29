import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetAppBuilderDocument } from './app-builder.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({GetAppBuilder : (variables: Types.GetAppBuilderQueryVariables) => gqlRequest(client, GetAppBuilderDocument.toString(), variables)})