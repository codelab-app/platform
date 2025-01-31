import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetAuthGuardsDocument, CreateAuthGuardsDocument, UpdateAuthGuardDocument, DeleteAuthGuardsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	GetAuthGuards : (variables: Types.GetAuthGuardsQueryVariables) => gqlRequest(client, GetAuthGuardsDocument.toString(), variables),
	CreateAuthGuards : (variables: Types.CreateAuthGuardsMutationVariables) => gqlRequest(client, CreateAuthGuardsDocument.toString(), variables),
	UpdateAuthGuard : (variables: Types.UpdateAuthGuardMutationVariables) => gqlRequest(client, UpdateAuthGuardDocument.toString(), variables),
	DeleteAuthGuards : (variables: Types.DeleteAuthGuardsMutationVariables) => gqlRequest(client, DeleteAuthGuardsDocument.toString(), variables)
})
