import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { PropFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreatePropsMutationVariables,
  type UpdatePropsMutationVariables,
  type DeletePropsMutationVariables,
  type GetPropsQueryVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from './prop.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateProps: (variables: CreatePropsMutationVariables) =>
    gqlRequest(client, CreatePropsDocument.toString(), variables),
  UpdateProps: (variables: UpdatePropsMutationVariables) =>
    gqlRequest(client, UpdatePropsDocument.toString(), variables),
  DeleteProps: (variables: DeletePropsMutationVariables) =>
    gqlRequest(client, DeletePropsDocument.toString(), variables),
  GetProps: (variables: GetPropsQueryVariables) =>
    gqlRequest(client, GetPropsDocument.toString(), variables),
})
