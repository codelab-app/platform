import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateCodeActionsDocument, CreateApiActionsDocument } from './create-action.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	CreateCodeActions : (variables: Types.CreateCodeActionsMutationVariables) => gqlRequest(client, CreateCodeActionsDocument.toString(), variables),
	CreateApiActions : (variables: Types.CreateApiActionsMutationVariables) => gqlRequest(client, CreateApiActionsDocument.toString(), variables)
})