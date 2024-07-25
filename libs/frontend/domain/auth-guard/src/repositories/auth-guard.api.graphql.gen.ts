import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { AuthGuardFragmentDoc } from '@codelab/frontend/infra/gql'

export const GetAuthGuardsDocument = graphql(`
  query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {
    aggregate: authGuardsAggregate(where: $where) {
      count
    }
    items: authGuards(options: $options, where: $where) {
      ...AuthGuard
    }
  }
`)

export const CreateAuthGuardsDocument = graphql(`
  mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
    createAuthGuards(input: $input) {
      authGuards {
        id
      }
    }
  }
`)

export const UpdateAuthGuardDocument = graphql(`
  mutation UpdateAuthGuard(
    $where: AuthGuardWhere
    $update: AuthGuardUpdateInput
  ) {
    updateAuthGuards(update: $update, where: $where) {
      authGuards {
        id
      }
    }
  }
`)

export const DeleteAuthGuardsDocument = graphql(`
  mutation DeleteAuthGuards(
    $where: AuthGuardWhere
    $delete: AuthGuardDeleteInput
  ) {
    deleteAuthGuards(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`)
import {
  type GetAuthGuardsQueryVariables,
  type CreateAuthGuardsMutationVariables,
  type UpdateAuthGuardMutationVariables,
  type DeleteAuthGuardsMutationVariables,
} from '@codelab/frontend/infra/gql'

const GetAuthGuards = (
  variables: GetAuthGuardsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAuthGuardsDocument, variables, next)

const CreateAuthGuards = (
  variables: CreateAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAuthGuardsDocument, variables, next)

const UpdateAuthGuard = (
  variables: UpdateAuthGuardMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAuthGuardDocument, variables, next)

const DeleteAuthGuards = (
  variables: DeleteAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAuthGuardsDocument, variables, next)

export const getSdk = () => ({
  GetAuthGuards,
  CreateAuthGuards,
  UpdateAuthGuard,
  DeleteAuthGuards,
})
