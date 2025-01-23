import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { AuthGuardFragmentDoc } from '@codelab/shared/infra/gqlgen'

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
        __typename
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
        __typename
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
