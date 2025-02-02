import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateComponentsDocument, DeleteComponentsDocument, UpdateComponentsDocument, ComponentListDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateComponents : (variables: Types.CreateComponentsMutationVariables) => gqlRequest(client, CreateComponentsDocument.toString(), variables),
	DeleteComponents : (variables: Types.DeleteComponentsMutationVariables) => gqlRequest(client, DeleteComponentsDocument.toString(), variables),
	UpdateComponents : (variables: Types.UpdateComponentsMutationVariables) => gqlRequest(client, UpdateComponentsDocument.toString(), variables),
	ComponentList : (variables: Types.ComponentListQueryVariables) => gqlRequest(client, ComponentListDocument.toString(), variables)
})
