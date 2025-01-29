import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { DeleteCodeActionsDocument, DeleteApiActionsDocument } from './delete-action.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	DeleteCodeActions : (variables: Types.DeleteCodeActionsMutationVariables) => gqlRequest(client, DeleteCodeActionsDocument.toString(), variables),
	DeleteApiActions : (variables: Types.DeleteApiActionsMutationVariables) => gqlRequest(client, DeleteApiActionsDocument.toString(), variables)
})