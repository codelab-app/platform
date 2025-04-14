import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreatePagesDocument, DeletePagesDocument, UpdatePagesDocument, PageListDocument, GetRenderedPageDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreatePages: (variables: Types.CreatePagesMutationVariables) => gqlRequest(client, CreatePagesDocument.toString(), variables),
	DeletePages: (variables: Types.DeletePagesMutationVariables) => gqlRequest(client, DeletePagesDocument.toString(), variables),
	UpdatePages: (variables: Types.UpdatePagesMutationVariables) => gqlRequest(client, UpdatePagesDocument.toString(), variables),
	PageList: (variables: Types.PageListQueryVariables) => gqlRequest(client, PageListDocument.toString(), variables),
	GetRenderedPage: (variables: Types.GetRenderedPageQueryVariables) => gqlRequest(client, GetRenderedPageDocument.toString(), variables)
})
