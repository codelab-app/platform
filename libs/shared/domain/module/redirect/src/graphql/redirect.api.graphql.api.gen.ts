import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateRedirectsDocument, DeleteRedirectsDocument, UpdateRedirectsDocument, GetRedirectsDocument, GetRedirectsPreviewDocument } from './redirect.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	CreateRedirects : (variables: Types.CreateRedirectsMutationVariables) => gqlRequest(client, CreateRedirectsDocument.toString(), variables),
	DeleteRedirects : (variables: Types.DeleteRedirectsMutationVariables) => gqlRequest(client, DeleteRedirectsDocument.toString(), variables),
	UpdateRedirects : (variables: Types.UpdateRedirectsMutationVariables) => gqlRequest(client, UpdateRedirectsDocument.toString(), variables),
	GetRedirects : (variables: Types.GetRedirectsQueryVariables) => gqlRequest(client, GetRedirectsDocument.toString(), variables),
	GetRedirectsPreview : (variables: Types.GetRedirectsPreviewQueryVariables) => gqlRequest(client, GetRedirectsPreviewDocument.toString(), variables)
})