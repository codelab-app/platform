import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateStoresDocument, DeleteStoresDocument, GetStoresDocument, UpdateStoresDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateStores : (variables: Types.CreateStoresMutationVariables) => gqlRequest(client, CreateStoresDocument.toString(), variables),
	DeleteStores : (variables: Types.DeleteStoresMutationVariables) => gqlRequest(client, DeleteStoresDocument.toString(), variables),
	GetStores : (variables: Types.GetStoresQueryVariables) => gqlRequest(client, GetStoresDocument.toString(), variables),
	UpdateStores : (variables: Types.UpdateStoresMutationVariables) => gqlRequest(client, UpdateStoresDocument.toString(), variables)
})