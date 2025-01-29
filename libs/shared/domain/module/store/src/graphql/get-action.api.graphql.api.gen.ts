import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetActionsDocument } from './get-action.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({GetActions : (variables: Types.GetActionsQueryVariables) => gqlRequest(client, GetActionsDocument.toString(), variables)})