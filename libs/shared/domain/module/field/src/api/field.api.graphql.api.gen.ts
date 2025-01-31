import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateFieldsDocument, UpdateFieldsDocument, DeleteFieldsDocument, GetFieldsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateFields : (variables: Types.CreateFieldsMutationVariables) => gqlRequest(client, CreateFieldsDocument.toString(), variables),
	UpdateFields : (variables: Types.UpdateFieldsMutationVariables) => gqlRequest(client, UpdateFieldsDocument.toString(), variables),
	DeleteFields : (variables: Types.DeleteFieldsMutationVariables) => gqlRequest(client, DeleteFieldsDocument.toString(), variables),
	GetFields : (variables: Types.GetFieldsQueryVariables) => gqlRequest(client, GetFieldsDocument.toString(), variables)
})
