import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateElementsDocument, DeleteElementsDocument, UpdateElementsDocument, ElementListDocument } from './element.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({
	CreateElements : (variables: Types.CreateElementsMutationVariables) => gqlRequest(client, CreateElementsDocument.toString(), variables),
	DeleteElements : (variables: Types.DeleteElementsMutationVariables) => gqlRequest(client, DeleteElementsDocument.toString(), variables),
	UpdateElements : (variables: Types.UpdateElementsMutationVariables) => gqlRequest(client, UpdateElementsDocument.toString(), variables),
	ElementList : (variables: Types.ElementListQueryVariables) => gqlRequest(client, ElementListDocument.toString(), variables)
})