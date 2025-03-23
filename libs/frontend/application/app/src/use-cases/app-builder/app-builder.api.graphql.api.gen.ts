import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetAppBuilderDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({GetAppBuilder: (variables: Types.GetAppBuilderQueryVariables) => gqlRequest(client, GetAppBuilderDocument.toString(), variables)})
