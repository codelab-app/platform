import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { IsTypeDescendantOfDocument, GetTypeReferencesDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	IsTypeDescendantOf : (variables: Types.IsTypeDescendantOfQueryVariables) => gqlRequest(client, IsTypeDescendantOfDocument.toString(), variables),
	GetTypeReferences : (variables: Types.GetTypeReferencesQueryVariables) => gqlRequest(client, GetTypeReferencesDocument.toString(), variables)
})
