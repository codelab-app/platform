import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { PropFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreatePropsMutationVariables,
  type UpdatePropsMutationVariables,
  type DeletePropsMutationVariables,
  type GetPropsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreatePropsDocument,
  UpdatePropsDocument,
  DeletePropsDocument,
  GetPropsDocument,
} from './prop.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateProps: (variables: CreatePropsMutationVariables) =>
    gqlRequest(CreatePropsDocument.toString(), variables),
  UpdateProps: (variables: UpdatePropsMutationVariables) =>
    gqlRequest(UpdatePropsDocument.toString(), variables),
  DeleteProps: (variables: DeletePropsMutationVariables) =>
    gqlRequest(DeletePropsDocument.toString(), variables),
  GetProps: (variables: GetPropsQueryVariables) =>
    gqlRequest(GetPropsDocument.toString(), variables),
})
