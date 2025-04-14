import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateTagsDocument, UpdateTagsDocument, DeleteTagsDocument, GetTagsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateTags: (variables: Types.CreateTagsMutationVariables) => gqlRequest(client, CreateTagsDocument.toString(), variables),
	UpdateTags: (variables: Types.UpdateTagsMutationVariables) => gqlRequest(client, UpdateTagsDocument.toString(), variables),
	DeleteTags: (variables: Types.DeleteTagsMutationVariables) => gqlRequest(client, DeleteTagsDocument.toString(), variables),
	GetTags: (variables: Types.GetTagsQueryVariables) => gqlRequest(client, GetTagsDocument.toString(), variables)
})
