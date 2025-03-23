import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { ResourceListDocument, CreateResourcesDocument, UpdateResourcesDocument, DeleteResourcesDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	ResourceList: (variables: Types.ResourceListQueryVariables) => gqlRequest(client, ResourceListDocument.toString(), variables),
	CreateResources: (variables: Types.CreateResourcesMutationVariables) => gqlRequest(client, CreateResourcesDocument.toString(), variables),
	UpdateResources: (variables: Types.UpdateResourcesMutationVariables) => gqlRequest(client, UpdateResourcesDocument.toString(), variables),
	DeleteResources: (variables: Types.DeleteResourcesMutationVariables) => gqlRequest(client, DeleteResourcesDocument.toString(), variables)
})
