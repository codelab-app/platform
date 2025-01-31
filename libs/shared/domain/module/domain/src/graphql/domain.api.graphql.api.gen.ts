import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { DomainListDocument, CreateDomainsDocument, UpdateDomainsDocument, DeleteDomainsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	DomainList : (variables: Types.DomainListQueryVariables) => gqlRequest(client, DomainListDocument.toString(), variables),
	CreateDomains : (variables: Types.CreateDomainsMutationVariables) => gqlRequest(client, CreateDomainsDocument.toString(), variables),
	UpdateDomains : (variables: Types.UpdateDomainsMutationVariables) => gqlRequest(client, UpdateDomainsDocument.toString(), variables),
	DeleteDomains : (variables: Types.DeleteDomainsMutationVariables) => gqlRequest(client, DeleteDomainsDocument.toString(), variables)
})