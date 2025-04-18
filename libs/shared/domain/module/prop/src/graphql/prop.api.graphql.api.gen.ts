import * as Types from '@codelab/shared-infra-gqlgen'

import { gqlRequest } from '@codelab/shared-infra-fetch'
import { GraphQLClient } from 'graphql-request'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from '@codelab/shared-infra-gqlgen'

export const getSdk = (client: GraphQLClient) => ({
  CreateProps: (variables: Types.CreatePropsMutationVariables) =>
    gqlRequest(client, CreatePropsDocument.toString(), variables),
  UpdateProps: (variables: Types.UpdatePropsMutationVariables) =>
    gqlRequest(client, UpdatePropsDocument.toString(), variables),
  DeleteProps: (variables: Types.DeletePropsMutationVariables) =>
    gqlRequest(client, DeletePropsDocument.toString(), variables),
  GetProps: (variables: Types.GetPropsQueryVariables) =>
    gqlRequest(client, GetPropsDocument.toString(), variables),
})
