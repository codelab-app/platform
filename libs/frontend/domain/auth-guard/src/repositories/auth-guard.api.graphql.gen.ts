import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { AuthGuardFragmentDoc } from '@codelab/shared/infra/gql'

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
} from '@codelab/shared/infra/gql'

export const GetAuthGuards = (
  variables: GetAuthGuardsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAuthGuardsDocument.toString(), variables, next)

export const CreateAuthGuards = (
  variables: CreateAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAuthGuardsDocument.toString(), variables, next)

export const UpdateAuthGuard = (
  variables: UpdateAuthGuardMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAuthGuardDocument.toString(), variables, next)

export const DeleteAuthGuards = (
  variables: DeleteAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAuthGuardsDocument.toString(), variables, next)
