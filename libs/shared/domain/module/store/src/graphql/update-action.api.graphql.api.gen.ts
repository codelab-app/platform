import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { UpdateCodeActionsDocument, UpdateApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	UpdateCodeActions : (variables: Types.UpdateCodeActionsMutationVariables) => gqlRequest(client, UpdateCodeActionsDocument.toString(), variables),
	UpdateApiActions : (variables: Types.UpdateApiActionsMutationVariables) => gqlRequest(client, UpdateApiActionsDocument.toString(), variables)
})