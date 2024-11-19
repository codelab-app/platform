import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { ComponentFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateComponentsMutationVariables,
  type DeleteComponentsMutationVariables,
  type UpdateComponentsMutationVariables,
  type ComponentListQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateComponentsDocument,
  DeleteComponentsDocument,
  UpdateComponentsDocument,
  ComponentListDocument,
} from './component.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateComponents: (variables: CreateComponentsMutationVariables) =>
    gqlRequest(CreateComponentsDocument.toString(), variables),
  DeleteComponents: (variables: DeleteComponentsMutationVariables) =>
    gqlRequest(DeleteComponentsDocument.toString(), variables),
  UpdateComponents: (variables: UpdateComponentsMutationVariables) =>
    gqlRequest(UpdateComponentsDocument.toString(), variables),
  ComponentList: (variables: ComponentListQueryVariables) =>
    gqlRequest(ComponentListDocument.toString(), variables),
})
