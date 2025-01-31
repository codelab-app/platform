import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlRequest } from '@codelab/shared/infra/fetch'
import { GraphQLClient } from 'graphql-request'
import { GetSelectAtomOptionsDocument } from '@codelab/shared/infra/gqlgen'

export const getSdk = (client: GraphQLClient) => ({GetSelectAtomOptions : (variables: Types.GetSelectAtomOptionsQueryVariables) => gqlRequest(client, GetSelectAtomOptionsDocument.toString(), variables)})
