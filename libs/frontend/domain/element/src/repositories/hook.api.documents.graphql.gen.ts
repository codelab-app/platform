import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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
