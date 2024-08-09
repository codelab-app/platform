import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { HookFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateHooksDocument = graphql(`
  mutation CreateHooks($input: [HookCreateInput!]!) {
    createHooks(input: $input) {
      hooks {
        ...Hook
      }
    }
  }
`)

export const DeleteHooksDocument = graphql(`
  mutation DeleteHooks($where: HookWhere!) {
    deleteHooks(where: $where) {
      nodesDeleted
    }
  }
`)

import {
  type CreateHooksMutationVariables,
  type DeleteHooksMutationVariables,
} from '@codelab/shared/infra/gql'

export const CreateHooks = (
  variables: CreateHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateHooksDocument.toString(), variables, next)

export const DeleteHooks = (
  variables: DeleteHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteHooksDocument.toString(), variables, next)
