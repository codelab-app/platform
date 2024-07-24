import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { HookFragmentDoc } from '@codelab/frontend/infra/gql'

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
} from '@codelab/frontend/infra/gql'

const CreateHooks = (
  variables: CreateHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateHooksDocument, variables, next)

const DeleteHooks = (
  variables: DeleteHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteHooksDocument, variables, next)

export const getSdk = () => ({ CreateHooks, DeleteHooks })
