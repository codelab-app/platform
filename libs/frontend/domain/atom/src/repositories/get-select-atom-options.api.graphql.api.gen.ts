import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetSelectAtomOptionsDocument } from './get-select-atom-options.api.graphql.docs.gen'


export const getSdk = (client: GraphQLClient) => ({GetSelectAtomOptions : (variables: Types.GetSelectAtomOptionsQueryVariables) => gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables)})