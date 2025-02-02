import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { CreateHooksDocument, DeleteHooksDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({
	CreateHooks : (variables: Types.CreateHooksMutationVariables) => gqlRequest(client, CreateHooksDocument.toString(), variables),
	DeleteHooks : (variables: Types.DeleteHooksMutationVariables) => gqlRequest(client, DeleteHooksDocument.toString(), variables)
})
