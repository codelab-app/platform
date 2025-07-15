import * as Types from '@codelab/shared-infra-gqlgen';

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import { GetPagePreviewDocument, GetPageProductionDocument } from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	GetPagePreview: (variables: Types.GetPagePreviewQueryVariables) => gqlRequest(client, GetPagePreviewDocument.toString(), variables),
	GetPageProduction: (variables: Types.GetPageProductionQueryVariables) => gqlRequest(client, GetPageProductionDocument.toString(), variables)
})
